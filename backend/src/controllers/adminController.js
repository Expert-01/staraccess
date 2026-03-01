import { query } from '../db.js'

// Default items to add for every celebrity
const DEFAULT_ITEMS = [
  {
    name: 'Fan Card',
    item_type: 'fan_card',
    description: 'Get your personalized fan card signed by this celebrity',
    tiers: [
      { tier_name: 'bronze', price: 500, stock: 100, description: 'Standard signed card' },
      { tier_name: 'silver', price: 750, stock: 80, description: 'Premium card with frame' },
      { tier_name: 'gold', price: 1000, stock: 50, description: 'Deluxe with hologram' },
      { tier_name: 'platinum', price: 1750, stock: 20, description: 'Ultimate collectors edition' }
    ]
  },
  {
    name: 'Membership Card',
    item_type: 'membership_card',
    description: 'Exclusive membership benefits and perks',
    tiers: [
      { tier_name: 'bronze', price: 500, stock: 100, description: 'Basic membership' },
      { tier_name: 'silver', price: 750, stock: 80, description: 'Silver benefits' },
      { tier_name: 'gold', price: 1000, stock: 50, description: 'Premium benefits' },
      { tier_name: 'platinum', price: 1750, stock: 20, description: 'Ultimate VIP benefits' }
    ]
  },
  {
    name: 'Call Permit',
    item_type: 'call_permit',
    description: 'One-on-one phone call with the celebrity (30 minutes)',
    tiers: [
      { tier_name: 'standard', price: 1000, stock: 30, description: '30-minute call' }
    ]
  },
  {
    name: 'VIP Access',
    item_type: 'vip_access',
    description: 'VIP event access and exclusive backstage experience',
    tiers: [
      { tier_name: 'bronze', price: 500, stock: 100, description: 'Basic VIP access' },
      { tier_name: 'silver', price: 750, stock: 80, description: 'Enhanced VIP access' },
      { tier_name: 'gold', price: 1000, stock: 50, description: 'Premium VIP access' },
      { tier_name: 'platinum', price: 1750, stock: 20, description: 'Ultimate VIP experience' }
    ]
  },
  {
    name: 'Meet & Greet',
    item_type: 'meet_and_greet',
    description: 'Meet and greet with the celebrity',
    tiers: [
      { tier_name: 'bronze', price: 500, stock: 50, description: 'Standard 15-min meet & greet' },
      { tier_name: 'silver', price: 750, stock: 40, description: 'Premium 30-min session' },
      { tier_name: 'gold', price: 1000, stock: 25, description: 'VIP 1-hour session with photo' },
      { tier_name: 'platinum', price: 1750, stock: 10, description: 'Ultimate experience with gifts' }
    ]
  }
]

// Helper function to create default items for a celebrity
const createDefaultItems = async (celebrityId) => {
  try {
    for (const item of DEFAULT_ITEMS) {
      // Insert item
      const itemResult = await query(
        'INSERT INTO items (celebrity_id, name, description, item_type, has_tiers) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [celebrityId, item.name, item.description, item.item_type, true]
      )

      const itemId = itemResult.rows[0].id

      // Insert tiers for this item
      for (const tier of item.tiers) {
        await query(
          'INSERT INTO item_tiers (item_id, tier_name, price, stock, description) VALUES ($1, $2, $3, $4, $5)',
          [itemId, tier.tier_name, tier.price, tier.stock, tier.description]
        )
      }
    }
  } catch (err) {
    console.error('Error creating default items:', err)
    throw err
  }
}

export const addCelebrity = async (req, res) => {
  try {
    const { name, category, bio, image, followers, yearsActive, responseTime } = req.body

    const result = await query(
      'INSERT INTO celebrities (name, category, bio, image, followers, years_active, response_time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, category, bio, image, followers, yearsActive, responseTime]
    )

    const celebrity = result.rows[0]

    // Create default items for the new celebrity
    try {
      await createDefaultItems(celebrity.id)
    } catch (itemErr) {
      console.error('Warning: Failed to create default items:', itemErr.message)
      // Continue anyway, celebrity was created successfully
    }

    // Fetch items with tiers
    const itemsResult = await query('SELECT * FROM items WHERE celebrity_id = $1', [celebrity.id])
    const items = itemsResult.rows

    for (let item of items) {
      const tiersResult = await query('SELECT * FROM item_tiers WHERE item_id = $1', [item.id])
      item.tiers = tiersResult.rows
    }

    celebrity.items = items

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
    const { name, description, itemType, image, tiers } = req.body
    const celebrityId = req.params.id

    // Validate item type
    const validTypes = ['fan_card', 'membership_card', 'call_permit', 'vip_access', 'meet_and_greet']
    if (!validTypes.includes(itemType)) {
      return res.status(400).json({ message: 'Invalid item type' })
    }

    // Check if item has tiers
    const hasTiers = tiers && Array.isArray(tiers) && tiers.length > 0

    // Insert item
    const itemResult = await query(
      'INSERT INTO items (celebrity_id, name, description, item_type, has_tiers, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [celebrityId, name, description, itemType, hasTiers, image]
    )

    const item = itemResult.rows[0]

    // Insert tiers if provided
    if (hasTiers) {
      for (let tier of tiers) {
        await query(
          'INSERT INTO item_tiers (item_id, tier_name, price, stock, description) VALUES ($1, $2, $3, $4, $5)',
          [item.id, tier.name, tier.price, tier.stock || 0, tier.description || '']
        )
      }

      // Fetch tiers
      const tiersResult = await query('SELECT * FROM item_tiers WHERE item_id = $1', [item.id])
      item.tiers = tiersResult.rows
    } else {
      // Single price item (Call Permit)
      const singlePrice = tiers && tiers[0] ? tiers[0].price : 1000
      await query(
        'INSERT INTO item_tiers (item_id, tier_name, price, stock, description) VALUES ($1, $2, $3, $4, $5)',
        [item.id, 'standard', singlePrice, tiers && tiers[0] ? tiers[0].stock : 0, 'Standard']
      )

      const tiersResult = await query('SELECT * FROM item_tiers WHERE item_id = $1', [item.id])
      item.tiers = tiersResult.rows
    }

    res.status(201).json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
