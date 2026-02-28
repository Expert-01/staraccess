// dotenv is loaded by db.js before pool creation
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import pool from './db.js'

import authRoutes from './routes/authRoutes.js'
import celebrityRoutes from './routes/celebrityRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000

// ============ CORS Configuration ============
const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// ============ Static File Serving ============
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// ============ Database Connection Test ============
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ PostgreSQL connection error:', err)
  } else {
    console.log('✅ PostgreSQL connected:', res.rows[0])
  }
})

// ============ API Routes ============
app.use('/api/auth', authRoutes)
app.use('/api/celebrities', celebrityRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/admin', adminRoutes)

// ============ Health Check Endpoint ============
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  })
})

// ============ 404 Handler ============
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
  })
})

// ============ Global Error Handler ============
app.use((err, req, res, next) => {
  console.error('Error:', err)

  const status = err.status || 500
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { details: err.stack }),
  })
})

// ============ Server Startup ============
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔐 CORS enabled for:`, corsOptions.origin)
})

// ============ Graceful Shutdown ============
const gracefulShutdown = () => {
  console.log('\n⏹️  Shutting down gracefully...')
  server.close(() => {
    console.log('✅ HTTP server closed')
    pool.end(() => {
      console.log('✅ Database pool closed')
      process.exit(0)
    })
  })

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('❌ Could not close connections in time, forcing shutdown')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

export default app
