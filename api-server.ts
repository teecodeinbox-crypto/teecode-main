import { WebSocket } from 'ws';
// Polyfill WebSocket for Supabase client on older Node versions
if (!globalThis.WebSocket) {
  (globalThis as any).WebSocket = WebSocket;
}

import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// =====================
// Supabase Setup
// =====================
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// =====================
// Razorpay Setup
// =====================
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || '';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || '';
const razorpay = razorpayKeyId && razorpayKeySecret
  ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
  : null;

// =====================
// Fallback: Local file storage
// =====================
const ORDERS_FILE = path.join(process.env.NODE_ENV === 'production' ? '/tmp' : process.cwd(), 'orders.json');

interface OrderItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  total: number;
  paymentMethod: 'online' | 'cod';
  paymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  status: 'PENDING' | 'DISPATCHED' | 'IN_TRANSIT' | 'DELIVERED';
  createdAt: string;
}

try {
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
} catch (e) {
  console.warn('Could not initialize orders.json:', e);
}

function readOrders(): Order[] {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
  } catch { return []; }
}

function writeOrders(orders: Order[]) {
  try { fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8'); } catch {}
}

// =====================
// Express App
// =====================
const app = express();
const PORT = parseInt(process.env.PORT || '3001');

// CORS — allow frontend origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://teecode.store',
  'https://www.teecode.store',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in early stage, tighten later
    }
  },
  credentials: true,
}));

app.use(express.json());

// =====================
// Health Check
// =====================
app.get('/', (req, res) => {
  res.json({
    service: 'TeeCode API',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    supabase: !!supabase,
    razorpay: !!razorpay,
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', supabase: !!supabase, razorpay: !!razorpay });
});

// =====================
// Razorpay: Create Order
// =====================
app.post('/razorpay/create-order', async (req, res) => {
  if (!razorpay) return res.status(503).json({ error: 'Razorpay not configured.' });

  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    res.json({
      success: true,
      order: { id: order.id, amount: order.amount, currency: order.currency, key_id: razorpayKeyId },
    });
  } catch (err) {
    console.error('Razorpay create order error:', err);
    res.status(500).json({ error: 'Failed to create Razorpay order.' });
  }
});

// =====================
// Razorpay: Verify Payment
// =====================
app.post('/razorpay/verify', (req, res) => {
  if (!razorpayKeySecret) return res.status(503).json({ error: 'Razorpay not configured.' });

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const expected = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expected === razorpay_signature) {
      res.json({ success: true, message: 'Payment verified.' });
    } else {
      res.status(400).json({ success: false, error: 'Invalid signature.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Verification failed.' });
  }
});

// =====================
// Orders: Create
// =====================
app.post('/orders', async (req, res) => {
  const { customerName, email, phone, address, city, state, pincode, items, total, paymentMethod, paymentId, razorpayOrderId, razorpaySignature } = req.body;

  if (!customerName || !phone || !address || !items?.length || !total) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const orderId = 'TC-' + Math.floor(100000 + Math.random() * 900000);

  const newOrder: Order = {
    id: orderId, customerName, email: email || '', phone, address,
    city: city || '', state: state || '', pincode: pincode || '',
    items, total, paymentMethod,
    paymentId: paymentId || '', razorpayOrderId: razorpayOrderId || '',
    razorpaySignature: razorpaySignature || '',
    status: 'PENDING', createdAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { error: orderError } = await supabase.from('orders').insert({
        id: newOrder.id, customer_name: newOrder.customerName, email: newOrder.email,
        phone: newOrder.phone, address: newOrder.address, city: newOrder.city,
        state: newOrder.state, pincode: newOrder.pincode, total: newOrder.total,
        payment_method: newOrder.paymentMethod, payment_id: newOrder.paymentId,
        razorpay_order_id: newOrder.razorpayOrderId, razorpay_signature: newOrder.razorpaySignature,
        status: newOrder.status,
      });
      if (orderError) throw orderError;

      await supabase.from('order_items').insert(
        items.map((item: OrderItem) => ({
          order_id: newOrder.id, product_id: item.id, product_name: item.name,
          size: item.size, color: item.color, price: item.price, quantity: item.quantity,
        }))
      );
      console.log(`[Supabase] Order ${orderId}, ${customerName}, ₹${total}`);
    } catch (err) {
      console.error('Supabase failed, local fallback:', err);
      const orders = readOrders(); orders.push(newOrder); writeOrders(orders);
    }
  } else {
    const orders = readOrders(); orders.push(newOrder); writeOrders(orders);
    console.log(`[Local] Order ${orderId}, ${customerName}, ₹${total}`);
  }

  res.status(201).json({ success: true, order: newOrder });
});

// =====================
// Orders: Get by ID
// =====================
app.get('/orders/:id', async (req, res) => {
  const { id } = req.params;

  if (supabase) {
    try {
      const { data: order, error } = await supabase
        .from('orders').select('*')
        .or(`id.eq.${id},id.eq.TC-${id}`)
        .single();

      if (error || !order) return res.status(404).json({ error: 'Order not found.' });

      const { data: items } = await supabase
        .from('order_items').select('*').eq('order_id', order.id);

      return res.json({
        success: true,
        order: {
          id: order.id, customerName: order.customer_name, email: order.email,
          phone: order.phone, address: order.address, city: order.city,
          state: order.state, pincode: order.pincode, total: order.total,
          paymentMethod: order.payment_method, status: order.status,
          createdAt: order.created_at,
          items: (items || []).map((i: any) => ({
            id: i.product_id, name: i.product_name, size: i.size,
            color: i.color, price: i.price, quantity: i.quantity,
          })),
        },
      });
    } catch {}
  }

  const orders = readOrders();
  const order = orders.find(o => o.id === id || o.id === `TC-${id}`);
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  res.json({ success: true, order });
});

// =====================
// Orders: Admin list
// =====================
app.get('/admin/orders', async (req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('orders').select('*').order('created_at', { ascending: false });
      if (!error) return res.json({ success: true, orders: data || [] });
    } catch {}
  }
  res.json({ success: true, orders: readOrders().reverse() });
});

// =====================
// Start
// =====================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`🚀 TeeCode API running on port ${PORT}`);
  console.log(`📦 Supabase: ${supabase ? 'CONNECTED' : 'LOCAL FALLBACK'}`);
  console.log(`💳 Razorpay: ${razorpay ? 'CONFIGURED' : 'NOT CONFIGURED'}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
});
