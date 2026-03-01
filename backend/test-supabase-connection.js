// Test Supabase Connection
import pkg from 'pg';
const { Pool } = pkg;

const connectionString = 'postgresql://postgres.sihznmwxehevigqtsvzk:RmD6hsDZ2lpCoAud@aws-1-eu-west-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function testConnection() {
  try {
    console.log('🔌 Testing Supabase connection...');
    
    const client = await pool.connect();
    console.log('✅ Successfully connected to Supabase!');
    
    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('📍 Server time:', result.rows[0].now);
    
    // Check if tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📊 Existing tables:', tablesResult.rows.map(r => r.table_name));
    
    client.release();
    
    console.log('\n✨ Supabase connection is working!');
    console.log('📌 Next step: Run the schema.sql to create tables');
    
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    console.log('\n🔍 Troubleshooting:');
    console.log('1. Verify the connection string is correct');
    console.log('2. Check firewall allows connections');
    console.log('3. Ensure Supabase project is active');
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testConnection();
