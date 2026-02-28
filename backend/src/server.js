// dotenv is loaded by db.js before pool creation
import express from 'express'
import cors from 'cors'
import pool from './db.js'

import authRoutes from './routes/authRoutes.js'
import celebrityRoutes from './routes/celebrityRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Test PostgreSQL connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('PostgreSQL connection error:', err)
  } else {
    console.log('✅ PostgreSQL connected:', res.rows[0])
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/celebrities', celebrityRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/admin', adminRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
