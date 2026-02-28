import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { query } from '../db.js'

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await query('SELECT id FROM users WHERE email = $1', [email])
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await query(
      'INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, email, is_admin',
      [name, email, hashedPassword, false]
    )

    const user = result.rows[0]

    const token = jwt.sign(
      { userId: user.id, email: user.email, isAdmin: user.is_admin },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    res.status(201).json({
      message: 'User created',
      token,
      userId: user.id
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await query('SELECT id, email, password, is_admin FROM users WHERE email = $1', [email])
    
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' })
    }

    const user = result.rows[0]

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, isAdmin: user.is_admin },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    res.json({
      message: 'Login successful',
      token,
      userId: user.id,
      isAdmin: user.is_admin
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
