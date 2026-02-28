import { query } from '../db.js'

export const addCelebrity = async (req, res) => {
  try {
    const { name, category, bio, image, followers, yearsActive, responseTime } = req.body

    const result = await query(
      'INSERT INTO celebrities (name, category, bio, image, followers, years_active, response_time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, category, bio, image, followers, yearsActive, responseTime]
    )

    const celebrity = result.rows[0]
    celebrity.items = []

    res.status(201).json(celebrity)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateCelebrity = async (req, res) => {
  try {
    const { name, category, bio, image, followers, yearsActive, responseTime } = req.body

    const result = await query(
      'UPDATE celebrities SET name = $1, category = $2, bio = $3, image = $4, followers = $5, years_active = $6, response_time = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
      [name, category, bio, image, followers, yearsActive, responseTime, req.params.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Celebrity not found' })
    }

    const itemsResult = await query('SELECT * FROM items WHERE celebrity_id = $1', [req.params.id])
    const celebrity = result.rows[0]
    celebrity.items = itemsResult.rows

    res.json(celebrity)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteCelebrity = async (req, res) => {
  try {
    const result = await query('DELETE FROM celebrities WHERE id = $1 RETURNING id', [req.params.id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Celebrity not found' })
    }

    res.json({ message: 'Celebrity deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addItem = async (req, res) => {
  try {
    const { name, description, price, stock, image, category } = req.body

    const result = await query(
      'INSERT INTO items (celebrity_id, name, description, price, stock, image, item_category) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [req.params.id, name, description, price, stock, image, category]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Error adding item' })
    }

    const celebResult = await query('SELECT * FROM celebrities WHERE id = $1', [req.params.id])
    const itemsResult = await query('SELECT * FROM items WHERE celebrity_id = $1', [req.params.id])

    const celebrity = celebResult.rows[0]
    celebrity.items = itemsResult.rows

    res.status(201).json(celebrity)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
