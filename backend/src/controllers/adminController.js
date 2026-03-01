import { query } from '../db.js'

// Default items to create for each celebrity
const DEFAULT_ITEMS = [
  {
    name: 'Fan Card',
    itemType: 'fan_card',
    description: 'Get an autographed fan card from your favorite celebrity',
    tiers: [
      { name: 'bronze', price: 500, stock: 100, description: 'Standard edition' },
      { name: 'silver', price: 750, stock: 80, description: 'Premium edition with frame' },
      { name: 'gold', price: 1000, stock: 50, description: 'Deluxe with certificate' },
      { name: 'platinum', price: 1750, stock: 20, description: 'Ultimate collectors edition' }
    ]
  },
  {
    name: 'Membership Card',
    itemType: 'membership_card',
    description: 'Exclusive membership benefits and fan club perks',
    tiers: [
      { name: 'bronze', price: 500, stock: 150, description: 'Basic membership (3 months)' },
      { name: 'silver', price: 750, stock: 120, description: 'Premium membership (6 months)' },
      { name: 'gold', price: 1000, stock: 80, description: 'VIP membership (1 year)' },
      { name: 'platinum', price: 1750, stock: 30, description: 'Lifetime VIP membership' }
    ]
  },
  {
    name: 'Call Permit',
    itemType: 'call_permit',
    description: 'One-on-one phone call with the celebrity (30 minutes)',
    tiers: [
      { name: 'standard', price: 1000, stock: 50, description: '30-minute call' }
    ]
  },
  {
    name: 'VIP Access',
    itemType: 'vip_access',
    description: 'VIP event access and exclusive backstage experience',
    tiers: [
      { name: 'bronze', price: 500, stock: 100, description: 'Basic event access' },
      { name: 'silver', price: 750, stock: 75, description: 'Event + meet & greet' },
      { name: 'gold', price: 1000, stock: 50, description: 'Event + backstage access' },
      { name: 'platinum', price: 1750, stock: 20, description: 'Premium event package' }
    ]
  },
  {
    name: 'Meet & Greet',
    itemType: 'meet_and_greet',
    description: 'Meet and greet with your favorite celebrity',
    tiers: [
      { name: 'bronze', price: 500, stock: 75, description: '15-minute meet & photo' },
      { name: 'silver', price: 750, stock: 60, description: '30-minute meet & 2 photos' },
      { name: 'gold', price: 1000, stock: 40, description: '1-hour meet & video' },
      { name: 'platinum', price: 1750, stock: 15, description: 'VIP experience + gifts' }
    ]
  }
]

export const addCelebrity = async (req, res) => {
  try {
    const { name, category, bio, image, followers, yearsActive, responseTime } = req.body

    const result = await query(
      'INSERT INTO celebrities (name, category, bio, image, followers, years_active, response_time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, category, bio, image, followers, yearsActive, responseTime]
    )

    const celebrity = result.rows[0]
    
    // Create default items for this celebrity
    const items = []
    for (let defaultItem of DEFAULT_ITEMS) {
      try {
        const itemResult = await query(
          'INSERT INTO items (celebrity_id, name, description, item_type, has_tiers) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [celebrity.id, defaultItem.name, defaultItem.description, defaultItem.itemType, true]
        )

        const item = itemResult.rows[0]
        
        // Create tiers for this item
        const tiersList = []
        for (let tier of defaultItem.tiers) {
          const tierResult = await query(
            'INSERT INTO item_tiers (item_id, tier_name, price, stock, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [item.id, tier.name, tier.price, tier.stock, tier.description]
          )
          tiersList.push(tierResult.rows[0])
        }

        item.tiers = tiersList
        items.push(item)
      } catch (tierErr) {
        console.error(`Error creating item ${defaultItem.name}:`, tierErr.message)
      }
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
