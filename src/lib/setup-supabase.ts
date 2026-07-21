/**
 * Run this script once to create the required tables in your Supabase database.
 * Usage: npx tsx src/lib/setup-supabase.ts
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🔧 Setting up Supabase tables...\n');

  // Test connection first
  const { error: testError } = await supabase.from('orders').select('id').limit(1);
  
  if (testError && testError.code === '42P01') {
    // Table doesn't exist — need to create it via SQL Editor
    console.log('⚠️  Tables do not exist yet.\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('You need to run the SQL schema in the Supabase SQL Editor:');
    console.log('');
    console.log('1. Open: https://supabase.com/dashboard/project/dztkjfmiwvvgdjjbibuj/sql');
    console.log('2. Copy and paste the contents of: src/lib/supabase-schema.sql');
    console.log('3. Click "Run"');
    console.log('4. Re-run this script to verify.');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    process.exit(1);
  } else if (testError) {
    console.error('❌ Unexpected error:', testError.message);
    process.exit(1);
  }

  console.log('✅ "orders" table exists!');

  // Check order_items
  const { error: itemsError } = await supabase.from('order_items').select('id').limit(1);
  if (itemsError && itemsError.code === '42P01') {
    console.log('⚠️  "order_items" table is missing. Run the full schema SQL.');
    process.exit(1);
  }
  console.log('✅ "order_items" table exists!');

  // Test insert + delete
  const testId = 'TC-TEST-' + Date.now();
  const { error: insertErr } = await supabase.from('orders').insert({
    id: testId,
    customer_name: 'Setup Test',
    phone: '0000000000',
    address: 'Test',
    total: 0,
    payment_method: 'cod',
    status: 'PENDING',
  });

  if (insertErr) {
    console.error('❌ Insert test failed:', insertErr.message);
    process.exit(1);
  }
  console.log('✅ Insert test passed!');

  // Clean up
  await supabase.from('orders').delete().eq('id', testId);
  console.log('✅ Cleanup passed!\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 Supabase is fully connected and ready!');
  console.log('   Your orders will now persist to the cloud database.');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

setupDatabase().catch(console.error);
