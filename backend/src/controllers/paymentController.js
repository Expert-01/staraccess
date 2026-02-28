import { query } from '../db.js'

export const processPayment = async (req, res) => {
  try {
    const { items, payment } = req.body
    const userId = req.userId

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const finalAmount = totalAmount * 1.1

    // Start transaction
    const client = await query('BEGIN')

    try {
      // Insert order
      const orderResult = await query(
        'INSERT INTO orders (user_id, total_amount, status, payment_method) VALUES ($1, $2, $3, $4) RETURNING id',
        [userId, finalAmount, 'completed', 'card']
      )

      const orderId = orderResult.rows[0].id

      // Insert order items
      for (let item of items) {
        await query(
          'INSERT INTO order_items (order_id, item_id, celebrity_id, name, price, quantity) VALUES ($1, $2, $3, $4, $5, $6)',
          [orderId, item.id || null, item.celebrity_id || null, item.name, item.price, item.quantity]
        )
      }

      await query('COMMIT')

      res.json({
        message: 'Payment processed successfully',
        orderId: orderId,
        amount: finalAmount
      })
    } catch (err) {
      await query('ROLLBACK')
      throw err
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getOrders = async (req, res) => {
  try {
    const userId = req.userId

    const result = await query(
      'SELECT o.*, json_agg(json_build_object(\'id\', oi.id, \'name\', oi.name, \'price\', oi.price, \'quantity\', oi.quantity)) as items FROM orders o LEFT JOIN order_items oi ON o.id = oi.order_id WHERE o.user_id = $1 GROUP BY o.id ORDER BY o.created_at DESC',
      [userId]
    )

    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
