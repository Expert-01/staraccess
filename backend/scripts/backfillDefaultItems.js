import dotenv from 'dotenv'
import { query } from '../src/db.js'

dotenv.config()

// Default items configuration
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

const createDefaultItemsForCelebrity = async (celebrityId) => {
  try {
    for (const item of DEFAULT_ITEMS) {
      // Check if item already exists
      const existsResult = await query(
        'SELECT id FROM items WHERE celebrity_id = $1 AND item_type = $2',
        [celebrityId, item.item_type]
      )

      if (existsResult.rows.length > 0) {
        console.log(`  ✓ ${item.name} already exists`)
        continue
      }

      // Insert item (use first tier price as default)
      const defaultPrice = item.tiers[0]?.price || 0
      const itemResult = await query(
        'INSERT INTO items (celebrity_id, name, description, item_type, has_tiers, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [celebrityId, item.name, item.description, item.item_type, true, defaultPrice]
      )

      const itemId = itemResult.rows[0].id

      // Insert tiers for this item
      for (const tier of item.tiers) {
        await query(
          'INSERT INTO item_tiers (item_id, tier_name, price, stock, description) VALUES ($1, $2, $3, $4, $5)',
          [itemId, tier.tier_name, parseInt(tier.price), parseInt(tier.stock), tier.description]
        )
      }

      console.log(`  ✓ Created ${item.name} with ${item.tiers.length} tier(s)`)
    }
  } catch (err) {
    console.error(`  ✗ Error creating items: ${err.message}`)
    throw err
  }
}

const backfillAllCelebrities = async () => {
  try {
    console.log('🎬 Starting backfill of default items for all celebrities...\n')

    // Get all celebrities
    const result = await query('SELECT id, name FROM celebrities ORDER BY id')
    const celebrities = result.rows

    if (celebrities.length === 0) {
      console.log('ℹ️  No celebrities found in database')
      process.exit(0)
    }

    console.log(`Found ${celebrities.length} celebrity(ies)\n`)

    let successCount = 0
    let errorCount = 0

    for (const celebrity of celebrities) {
      try {
        console.log(`Processing: ${celebrity.name} (ID: ${celebrity.id})`)
        await createDefaultItemsForCelebrity(celebrity.id)
        successCount++
        console.log()
      } catch (err) {
        errorCount++
        console.log()
      }
    }

    console.log('✅ Backfill completed!')
    console.log(`   ${successCount} celebrities processed successfully`)
    if (errorCount > 0) {
      console.log(`   ⚠️  ${errorCount} celebrities had errors`)
    }

    process.exit(0)
  } catch (err) {
    console.error('❌ Fatal error:', err.message)
    process.exit(1)
  }
}

backfillAllCelebrities()
