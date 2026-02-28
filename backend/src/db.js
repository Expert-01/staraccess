import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import pkg from 'pg'
const { Pool } = pkg

// Load .env file in db.js itself (before any connection attempt)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../.env')
console.log('📂 Loading .env from:', envPath)
const envLoadResult = dotenv.config({ path: envPath })
if (envLoadResult.error) {
  console.warn('⚠️  Warning: Could not load .env file:', envLoadResult.error.message)
  console.log('   This is OK if using environment variables from system/process')
} else {
  console.log('✅ .env file loaded successfully')
}

// Debug: Log all relevant environment variables
console.log('\n📋 Environment Variables Check:')
console.log('  DB_URL:', process.env.DB_URL ? '✅ SET' : '❌ NOT SET')
console.log('  DB_HOST:', process.env.DB_HOST ? '✅ SET' : '❌ NOT SET')
console.log('  DB_USER:', process.env.DB_USER ? '✅ SET' : '❌ NOT SET')
console.log('  DB_PASSWORD:', process.env.DB_PASSWORD ? '✅ SET' : '❌ NOT SET')
console.log('  NODE_ENV:', process.env.NODE_ENV || '(not set)')
console.log('')

// Debug: Log which connection method is being used
console.log('🔧 DB Connection Mode:', process.env.DB_URL ? 'Using DB_URL' : 'Using individual env vars')
if (process.env.DB_URL) {
  // Mask password in logs
  const maskedUrl = process.env.DB_URL.replace(/(:)([^@]+)(@)/, '$1***$3')
  console.log('📍 Connection String:', maskedUrl)
} else {
  console.log('📍 Fallback: postgres/postgres@localhost:5432/celebrity_browser')
}
console.log('')

// Use DB_URL if provided, otherwise build from individual components
const pool = new Pool(
  process.env.DB_URL
    ? {
        connectionString: process.env.DB_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'celebrity_browser',
        ssl: process.env.DB_HOST && process.env.DB_HOST.includes('supabase') ? { rejectUnauthorized: false } : false
      }
)

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

export const query = (text, params) => pool.query(text, params)
export const getClient = () => pool.connect()

export default pool
