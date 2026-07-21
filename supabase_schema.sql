-- ==========================================
-- Supabase Schema for TeeCode
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Orders Table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT,
  state TEXT,
  pincode TEXT,
  total NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  payment_id TEXT,
  razorpay_order_id TEXT,
  razorpay_signature TEXT,
  status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Order Items Table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL
);

-- 3. Row Level Security (RLS)
-- Disable RLS for now since backend (Service Role) handles logic directly
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
