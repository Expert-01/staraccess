import dotenv from 'dotenv'
import { query } from '../src/db.js'

dotenv.config()

// Mock celebrities data based on image filenames
const MOCK_CELEBRITIES = [
  {
    name: 'Ian Somerhalder',
    category: 'Actor',
    bio: 'Best known for his role as Damon Salvatore in The Vampire Diaries. A passionate environmental activist and philanthropist.',
    image: 'iansomerhalder.jpg',
    followers: 18500000,
    yearsActive: '2004-present',
    responseTime: '2-3 hours'
  },
  {
    name: 'Lainey Wilson',
    category: 'Country Music Artist',
    bio: 'Multi-award winning country music singer and songwriter known for her energetic live performances.',
    image: 'laineywilson.jpg',
    followers: 2400000,
    yearsActive: '2005-present',
    responseTime: '4-5 hours'
  },
  {
    name: 'Mark Wahlberg',
    category: 'Actor & Producer',
    bio: 'Award-winning actor and film producer known for action films and business ventures.',
    image: 'markwahlberg.jpg',
    followers: 18700000,
    yearsActive: '1991-present',
    responseTime: '1-2 hours'
  },
  {
    name: 'Matthew Lillard',
    category: 'Actor',
    bio: 'Versatile actor known for horror films and television series. Known for his intense performances.',
    image: 'mattewlillard.jpg',
    followers: 3100000,
    yearsActive: '1989-present',
    responseTime: '2-3 hours'
  },
  {
    name: 'Neil Diamond',
    category: 'Music Legend',
    bio: 'Legendary singer-songwriter known for timeless hits like "Sweet Caroline" and "I Am... I Said".',
    image: 'neildiamond.jpg',
    followers: 5600000,
    yearsActive: '1961-2017',
    responseTime: 'Not available'
  },
  {
    name: 'Sandra Bullock',
    category: 'Actress & Producer',
    bio: 'Award-winning actress and producer known for action films and comedies. Also known for her philanthropy.',
    image: 'sandrabullocks.jpg',
    followers: 18900000,
    yearsActive: '1987-present',
    responseTime: '2-4 hours'
  },
  {
    name: 'Skeet Ulrich',
    category: 'Actor',
    bio: 'Actor known for his roles in Scream, Riverdale, and various TV series.',
    image: 'skeetulrich.jpg',
    followers: 1800000,
    yearsActive: '1991-present',
    responseTime: '3-5 hours'
  },
  {
    name: 'Zac Efron',
    category: 'Actor & Entertainer',
    bio: 'Popular actor known for High School Musical and subsequent film roles. Also a fitness enthusiast and content creator.',
    image: 'zacefron.jpg',
    followers: 55200000,
    yearsActive: '2002-present',
    responseTime: '1-2 hours'
  },
  {
    name: 'Charlize Theron',
    category: 'Actress & Producer',
    bio: 'Academy Award-winning actress known for powerful dramatic roles and action films. Renowned for her versatility and commitment to craft.',
    image: 'charlize-theron.jpg',
    followers: 28000000,
    yearsActive: '1994-present',
    responseTime: '2-3 hours'
  },
  {
    name: 'Jennifer Aniston',
    category: 'Actress & Producer',
    bio: 'Iconic actress and producer with legendary Hollywood presence. Known for her role in Friends and successful film career.',
    image: 'jennifer-aniston.jpg',
    followers: 39000000,
    yearsActive: '1989-present',
    responseTime: '2-3 hours'
  }
]

const seedCelebrities = async () => {
  try {
    console.log('🎬 Seeding mock celebrities from frontend images...\n')

    let successCount = 0
    let errorCount = 0

    for (const celebrity of MOCK_CELEBRITIES) {
      try {
        console.log(`Adding: ${celebrity.name}`)

        // Insert celebrity
        const result = await query(
          'INSERT INTO celebrities (name, category, bio, image, followers, years_active, response_time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
          [celebrity.name, celebrity.category, celebrity.bio, celebrity.image, celebrity.followers, celebrity.yearsActive, celebrity.responseTime]
        )

        const celebrityId = result.rows[0].id
        console.log(`  ✓ Created celebrity (ID: ${celebrityId})`)

        // Create default items for this celebrity
        await createDefaultItems(celebrityId)

        successCount++
        console.log()
      } catch (err) {
        if (err.message.includes('duplicate key')) {
          console.log(`  ℹ️  Already exists, skipping`)
        } else {
          console.log(`  ✗ Error: ${err.message}`)
          errorCount++
        }
        console.log()
      }
    }

    console.log('✅ Seeding completed!')
    console.log(`   ${successCount} celebrities added successfully`)
    if (errorCount > 0) {
      console.log(`   ⚠️  ${errorCount} celebrities had errors`)
    }

    process.exit(0)
  } catch (err) {
    console.error('❌ Fatal error:', err.message)
    process.exit(1)
  }
}

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
    description: 'One-on-one phone call with the celebrity (30 minutes) billed monthly',
    tiers: [
      { tier_name: 'standard', price: 300, stock: 30, description: '30-minute call' }
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
    console.log(`  ✓ Created 5 items with tiers`)
  } catch (err) {
    throw err
  }
}

seedCelebrities()
