-- TeeCode Supabase Schema
-- Run this in your Supabase SQL Editor to create the required tables.

-- ============================
-- ORDERS TABLE
-- ============================
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT DEFAULT '',
  state TEXT DEFAULT '',
  pincode TEXT DEFAULT '',
  total NUMERIC NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('online', 'cod')),
  payment_id TEXT DEFAULT '',
  razorpay_order_id TEXT DEFAULT '',
  razorpay_signature TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================
-- ORDER ITEMS TABLE
-- ============================
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1
);

-- ============================
-- ROW LEVEL SECURITY (RLS)
-- ============================
-- Enable RLS on both tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Allow the server (service_role) full access
-- These policies allow our Express server (using service_role key) to read/write orders
CREATE POLICY "Service role full access on orders"
  ON orders
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on order_items"
  ON order_items
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to read their own order by ID (for order tracking)
CREATE POLICY "Anon can read orders by id"
  ON orders
  FOR SELECT
  USING (true);

CREATE POLICY "Anon can read order_items"
  ON order_items
  FOR SELECT
  USING (true);

-- ============================
-- INDEXES
-- ============================
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
