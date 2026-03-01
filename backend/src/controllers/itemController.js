import { query } from '../db.js'

// Get item details with all tiers
export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId
    const celebrityId = req.params.celebrityId

    // Get item details
    const itemResult = await query(
      'SELECT * FROM items WHERE id = $1 AND celebrity_id = $2',
      [itemId, celebrityId]
    )

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' })
    }

    const item = itemResult.rows[0]

    // Get tiers for this item
    const tiersResult = await query(
      'SELECT * FROM item_tiers WHERE item_id = $1 ORDER BY price ASC',
      [itemId]
    )

    item.tiers = tiersResult.rows

    // Get celebrity info
    const celebResult = await query(
      'SELECT id, name, image FROM celebrities WHERE id = $1',
      [celebrityId]
    )

    const response = {
      item,
      celebrity: celebResult.rows[0]
    }

    res.json(response)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get all items by celebrity with tiers
export const getCelebrityItems = async (req, res) => {
  try {
    const celebrityId = req.params.celebrityId

    // Get all items for celebrity
    const itemsResult = await query(
      'SELECT * FROM items WHERE celebrity_id = $1 ORDER BY name ASC',
      [celebrityId]
    )

    const items = itemsResult.rows

    // Get tiers for each item
    for (let item of items) {
      const tiersResult = await query(
        'SELECT * FROM item_tiers WHERE item_id = $1 ORDER BY price ASC',
        [item.id]
      )
      item.tiers = tiersResult.rows
    }

    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get item tier details
export const getItemTier = async (req, res) => {
  try {
    const { itemId, tierId } = req.params

    const tierResult = await query(
      'SELECT it.*, i.name as item_name, i.item_type FROM item_tiers it ' +
      'JOIN items i ON it.item_id = i.id ' +
      'WHERE it.id = $1 AND it.item_id = $2',
      [tierId, itemId]
    )

    if (tierResult.rows.length === 0) {
      return res.status(404).json({ message: 'Item tier not found' })
    }

    res.json(tierResult.rows[0])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
