import { query } from '../db.js'

export const getAllCelebrities = async (req, res) => {
  try {
    const result = await query('SELECT * FROM celebrities')
    const celebrities = result.rows

    // Get items for each celebrity
    for (let celebrity of celebrities) {
      const itemsResult = await query('SELECT * FROM items WHERE celebrity_id = $1', [celebrity.id])
      celebrity.items = itemsResult.rows
    }

    res.json(celebrities)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getCelebrityById = async (req, res) => {
  try {
    const result = await query('SELECT * FROM celebrities WHERE id = $1', [req.params.id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Celebrity not found' })
    }

    const celebrity = result.rows[0]

    const itemsResult = await query('SELECT * FROM items WHERE celebrity_id = $1', [celebrity.id])
    celebrity.items = itemsResult.rows

    res.json(celebrity)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
