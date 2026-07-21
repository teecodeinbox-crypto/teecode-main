import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

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
// Fallback: Local file storage (when Supabase is not configured)
// =====================
import fs from 'fs';
const ORDERS_FILE = path.join(process.cwd(), 'orders.json');

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

// Ensure the orders file exists
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

function readOrders(): Order[] {
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading orders file, resetting:', err);
    return [];
  }
}

function writeOrders(orders: Order[]) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing orders file:', err);
  }
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 5001;

  // JSON parsing middleware
  app.use(express.json());

  // =====================
  // API: Health Check
  // =====================
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      supabase: !!supabase,
      razorpay: !!razorpay,
    });
  });

  // =====================
  // API: Create Razorpay Order
  // =====================
  app.post('/api/razorpay/create-order', async (req, res) => {
    if (!razorpay) {
      return res.status(503).json({ error: 'Razorpay is not configured.' });
    }

    try {
      const { amount } = req.body;

      const order = await razorpay.orders.create({
        amount: amount * 100, // Razorpay expects paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      });

      res.json({
        success: true,
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
          key_id: razorpayKeyId,
        },
      });
    } catch (err) {
      console.error('Razorpay create order error:', err);
      res.status(500).json({ error: 'Failed to create Razorpay order.' });
    }
  });

  // =====================
  // API: Verify Razorpay Payment
  // =====================
  app.post('/api/razorpay/verify', (req, res) => {
    if (!razorpayKeySecret) {
      return res.status(503).json({ error: 'Razorpay is not configured.' });
    }

    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      const expectedSignature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (expectedSignature === razorpay_signature) {
        res.json({ success: true, message: 'Payment verified successfully.' });
      } else {
        res.status(400).json({ success: false, error: 'Invalid payment signature.' });
      }
    } catch (err) {
      console.error('Razorpay verify error:', err);
      res.status(500).json({ error: 'Payment verification failed.' });
    }
  });

  // =====================
  // API: Create Order
  // =====================
  app.post('/api/orders', async (req, res) => {
    const { customerName, email, phone, address, city, state, pincode, items, total, paymentMethod, paymentId, razorpayOrderId, razorpaySignature } = req.body;

    if (!customerName || !phone || !address || !items || !items.length || !total) {
      return res.status(400).json({ error: 'Missing required order parameters.' });
    }

    const orderId = 'TC-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder: Order = {
      id: orderId,
      customerName,
      email: email || '',
      phone,
      address,
      city: city || '',
      state: state || '',
      pincode: pincode || '',
      items,
      total,
      paymentMethod,
      paymentId: paymentId || '',
      razorpayOrderId: razorpayOrderId || '',
      razorpaySignature: razorpaySignature || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    // Try Supabase first, fallback to local file
    if (supabase) {
      try {
        const { error: orderError } = await supabase.from('orders').insert({
          id: newOrder.id,
          customer_name: newOrder.customerName,
          email: newOrder.email,
          phone: newOrder.phone,
          address: newOrder.address,
          city: newOrder.city,
          state: newOrder.state,
          pincode: newOrder.pincode,
          total: newOrder.total,
          payment_method: newOrder.paymentMethod,
          payment_id: newOrder.paymentId,
          razorpay_order_id: newOrder.razorpayOrderId,
          razorpay_signature: newOrder.razorpaySignature,
          status: newOrder.status,
        });

        if (orderError) throw orderError;

        // Insert order items
        const orderItems = items.map((item: OrderItem) => ({
          order_id: newOrder.id,
          product_id: item.id,
          product_name: item.name,
          size: item.size,
          color: item.color,
          price: item.price,
          quantity: item.quantity,
        }));

        const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
        if (itemsError) console.error('Error inserting order items:', itemsError);

        console.log(`[Supabase Order] ID: ${orderId}, Customer: ${customerName}, Total: ₹${total}`);
      } catch (dbErr) {
        console.error('Supabase insert failed, falling back to local:', dbErr);
        // Fallback to local
        const orders = readOrders();
        orders.push(newOrder);
        writeOrders(orders);
      }
    } else {
      // Local file storage
      const orders = readOrders();
      orders.push(newOrder);
      writeOrders(orders);
      console.log(`[Local Order] ID: ${orderId}, Customer: ${customerName}, Total: ₹${total}`);
    }

    res.status(201).json({ success: true, order: newOrder });
  });

  // =====================
  // API: Get Order by ID
  // =====================
  app.get('/api/orders/:id', async (req, res) => {
    const { id } = req.params;

    if (supabase) {
      try {
        const { data: order, error } = await supabase
          .from('orders')
          .select('*')
          .or(`id.eq.${id},id.eq.TC-${id}`)
          .single();

        if (error || !order) {
          return res.status(404).json({ error: 'Order not found.' });
        }

        // Get order items
        const { data: items } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id);

        return res.json({
          success: true,
          order: {
            id: order.id,
            customerName: order.customer_name,
            email: order.email,
            phone: order.phone,
            address: order.address,
            city: order.city,
            state: order.state,
            pincode: order.pincode,
            total: order.total,
            paymentMethod: order.payment_method,
            status: order.status,
            createdAt: order.created_at,
            items: (items || []).map((i: any) => ({
              id: i.product_id,
              name: i.product_name,
              size: i.size,
              color: i.color,
              price: i.price,
              quantity: i.quantity,
            })),
          },
        });
      } catch (err) {
        console.error('Supabase query error:', err);
      }
    }

    // Fallback to local file
    const orders = readOrders();
    const order = orders.find((o) => o.id === id || o.id === `TC-${id}`);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    res.json({ success: true, order });
  });

  // =====================
  // API: Get All Orders (Admin)
  // =====================
  app.get('/api/admin/orders', async (req, res) => {
    if (supabase) {
      try {
        const { data: orders, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        return res.json({ success: true, orders: orders || [] });
      } catch (err) {
        console.error('Supabase admin query error:', err);
      }
    }

    // Fallback
    const orders = readOrders();
    res.json({ success: true, orders: orders.reverse() });
  });

  // =====================
  // Vite / Static Serving
  // =====================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`-----------------------------------------------------`);
    console.log(`🚀 TeeCode Server is actively listening on Port ${PORT}`);
    console.log(`💻 Local Interface: http://localhost:${PORT}`);
    console.log(`📦 Supabase: ${supabase ? 'CONNECTED' : 'NOT CONFIGURED (using local file)'}`);
    console.log(`💳 Razorpay: ${razorpay ? 'CONFIGURED' : 'NOT CONFIGURED (simulated fallback)'}`);
    console.log(`-----------------------------------------------------`);
  });
}

startServer();
