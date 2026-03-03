import dotenv from 'dotenv'
import { query } from '../src/db.js'

dotenv.config()

const MOCK_CELEBRITIES = [
  {
    id: 101,
    name: 'Neil Diamond',
    category: 'Musician',
    bio: 'Legendary singer-songwriter known for iconic ballads',
    image: 'neildiamond.jpg',
    followers: 1800000,
    years_active: '1966-Present',
    response_time: '2-3 weeks'
  },
  {
    id: 102,
    name: 'Lainey Wilson',
    category: 'Musician',
    bio: 'Country music star with a powerful voice and presence',
    image: 'laineywilson.jpg',
    followers: 2300000,
    years_active: '2005-Present',
    response_time: '1-2 weeks'
  },
  {
    id: 103,
    name: 'Mary Padian',
    category: 'Actor',
    bio: 'TV personality and actress known for reality shows',
    image: 'marypadian.jpg',
    followers: 1200000,
    years_active: '2010-Present',
    response_time: '2-4 weeks'
  },
  {
    id: 104,
    name: 'Sandra Bullock',
    category: 'Actor',
    bio: 'Academy Award-winning actress with diverse filmography',
    image: 'sandrabullocks.jpg',
    followers: 2900000,
    years_active: '1987-Present',
    response_time: '2-3 weeks'
  },
  {
    id: 105,
    name: 'Mark Wahlberg',
    category: 'Actor',
    bio: 'Former rapper turned acclaimed actor and producer',
    image: 'markwahlberg.jpg',
    followers: 3100000,
    years_active: '1992-Present',
    response_time: '2-3 weeks'
  },
  {
    id: 106,
    name: 'Skeet Ulrich',
    category: 'Actor',
    bio: 'Talented actor known for horror and thriller roles',
    image: 'skeeetulrich.jpg',
    followers: 1400000,
    years_active: '1991-Present',
    response_time: '1-2 weeks'
  },
  {
    id: 107,
    name: 'Matthew Lillard',
    category: 'Actor',
    bio: 'Versatile actor with impressive range across genres',
    image: 'matthewlillard.jpg',
    followers: 1600000,
    years_active: '1989-Present',
    response_time: '2-3 weeks'
  },
  {
    id: 108,
    name: 'Ian Somerhalder',
    category: 'Actor',
    bio: 'Actor and environmental activist, known for TV roles',
    image: 'iansomerhalder.jpg',
    followers: 2700000,
    years_active: '2003-Present',
    response_time: '2-4 weeks'
  },
  {
    id: 109,
    name: 'Johnny Depp',
    category: 'Actor',
    bio: 'Versatile actor and producer known for iconic and unconventional roles',
    image: 'johnnydepp.jpg',
    followers: 4200000,
    years_active: '1984-Present',
    response_time: '2-3 weeks'
  },
  {
    id: 110,
    name: 'Zac Efron',
    category: 'Actor',
    bio: 'Pop star and actor known for musical and dramatic roles',
    image: 'zacefron.jpg',
    followers: 3300000,
    years_active: '2003-Present',
    response_time: '2-3 weeks'
  },
  {
    id: 112,
    name: 'Brandi Passante',
    category: 'Actor',
    bio: 'TV personality and businesswoman known for reality entertainment',
    image: 'brandipassante.jpg',
    followers: 1500000,
    years_active: '2010-Present',
    response_time: '1-2 weeks'
  },
  {
    id: 113,
    name: 'Jey Uso',
    category: 'Athlete',
    bio: 'Professional wrestler and entertainment performer with global following',
    image: 'jeyuso.jpg',
    followers: 2100000,
    years_active: '2009-Present',
    response_time: '2-3 weeks'
  }
]

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

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database with mock celebrities...\n')

    // Seed celebrities
    let seededCount = 0
    for (const celebrity of MOCK_CELEBRITIES) {
      try {
        const existsResult = await query('SELECT id FROM celebrities WHERE id = $1', [celebrity.id])
        if (existsResult.rows.length > 0) {
          console.log(`✓ ${celebrity.name} already exists`)
          continue
        }

        await query(
          'INSERT INTO celebrities (id, name, category, bio, image, followers, years_active, response_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [
            celebrity.id,
            celebrity.name,
            celebrity.category,
            celebrity.bio,
            celebrity.image,
            celebrity.followers,
            celebrity.years_active,
            celebrity.response_time
          ]
        )
        console.log(`✓ Seeded ${celebrity.name}`)
        seededCount++
      } catch (err) {
        console.log(`✗ Error seeding ${celebrity.name}: ${err.message}`)
      }
    }

    console.log(`\n✅ Seeded ${seededCount} new celebrities\n`)

    // Now backfill items for all celebrities
    console.log('🛍️  Backfilling default items for celebrities...\n')

    const result = await query('SELECT id, name FROM celebrities WHERE id >= 101 AND id <= 111 ORDER BY id')
    const celebrities = result.rows

    if (celebrities.length === 0) {
      console.log('ℹ️  No celebrities found')
      process.exit(0)
    }

    let itemsCreatedCount = 0

    for (const celebrity of celebrities) {
      console.log(`Processing: ${celebrity.name}`)
      for (const item of DEFAULT_ITEMS) {
        // Check if item already exists
        const existsResult = await query(
          'SELECT id FROM items WHERE celebrity_id = $1 AND item_type = $2',
          [celebrity.id, item.item_type]
        )

        if (existsResult.rows.length > 0) {
          console.log(`  ✓ ${item.name} already exists`)
          continue
        }

        // Insert item (use first tier price as default)
        const defaultPrice = item.tiers[0]?.price || 0
        const itemResult = await query(
          'INSERT INTO items (celebrity_id, name, description, item_type, has_tiers, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
          [celebrity.id, item.name, item.description, item.item_type, true, defaultPrice]
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
        itemsCreatedCount++
      }
      console.log()
    }

    console.log('✅ Database seeding and backfill completed!')
    console.log(`   ${seededCount} celebrities seeded`)
    console.log(`   ${itemsCreatedCount} items created with their tiers`)

    process.exit(0)
  } catch (err) {
    console.error('❌ Fatal error:', err.message)
    process.exit(1)
  }
}

seedDatabase()
