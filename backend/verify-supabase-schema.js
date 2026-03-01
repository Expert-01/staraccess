// Verify Supabase Schema Setup
import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const connectionString = 'postgresql://postgres.sihznmwxehevigqtsvzk:RmD6hsDZ2lpCoAud@aws-1-eu-west-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function verifySchema() {
  let client;
  try {
    console.log('🔌 Connecting to Supabase...\n');
    client = await pool.connect();
    console.log('✅ Connected to Supabase!\n');

    // Check tables
    console.log('📊 Checking Tables...');
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    const tables = tablesResult.rows.map(r => r.table_name);
    const expectedTables = ['users', 'celebrities', 'items', 'orders', 'order_items'];

    console.log(`Found ${tables.length} tables:`);
    tables.forEach(t => console.log(`  ✅ ${t}`));

    const missingTables = expectedTables.filter(t => !tables.includes(t));
    if (missingTables.length > 0) {
      console.log(`\n⚠️  Missing tables: ${missingTables.join(', ')}`);
      console.log('👉 Run schema.sql to create them');
    } else {
      console.log(`\n✅ All expected tables exist!`);
    }

    // Check data
    console.log('\n📈 Data Summary:');
    
    const counts = await Promise.all([
      client.query('SELECT COUNT(*) as count FROM users'),
      client.query('SELECT COUNT(*) as count FROM celebrities'),
      client.query('SELECT COUNT(*) as count FROM items'),
      client.query('SELECT COUNT(*) as count FROM orders'),
      client.query('SELECT COUNT(*) as count FROM order_items')
    ]);

    console.log(`  Users: ${counts[0].rows[0].count}`);
    console.log(`  Celebrities: ${counts[1].rows[0].count}`);
    console.log(`  Items: ${counts[2].rows[0].count}`);
    console.log(`  Orders: ${counts[3].rows[0].count}`);
    console.log(`  Order Items: ${counts[4].rows[0].count}`);

    // Check indexes
    console.log('\n🔍 Checking Indexes...');
    const indexResult = await client.query(`
      SELECT indexname 
      FROM pg_indexes 
      WHERE schemaname = 'public'
      AND tablename != 'pg_class'
      ORDER BY indexname
    `);

    if (indexResult.rows.length > 0) {
      console.log(`Found ${indexResult.rows.length} indexes:`);
      indexResult.rows.forEach(r => console.log(`  ✅ ${r.indexname}`));
    } else {
      console.log('  No indexes found');
    }

    // Overall status
    console.log('\n' + '='.repeat(50));
    if (missingTables.length === 0 && tables.length === expectedTables.length) {
      console.log('✨ SCHEMA VERIFICATION PASSED! ✨');
      console.log('Your Supabase database is ready to use.');
      console.log('');
      console.log('✅ Next Step: Start your backend with: npm run dev');
    } else {
      console.log('⚠️  SCHEMA SETUP INCOMPLETE');
      console.log('Follow instructions in SUPABASE_SETUP.md to complete setup');
    }
    console.log('='.repeat(50));

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('\n🔍 Troubleshooting Tips:');
    console.log('1. Check internet connection');
    console.log('2. Verify Supabase project is active (not paused)');
    console.log('3. Try pinging the host: ping aws-1-eu-west-1.pooler.supabase.com');
    console.log('4. Check firewall settings');
    console.log('\nFor detailed help, see SUPABASE_SETUP.md');
  } finally {
    if (client) client.release();
    await pool.end();
    process.exit(0);
  }
}

verifySchema();
