import dotenv from 'dotenv'
import { query } from '../src/db.js'

dotenv.config()

const migrateTables = async () => {
  try {
    console.log('🔄 Running migration to add missing columns...\n')

    // Check if item_type column exists
    const result = await query(
      "SELECT column_name FROM information_schema.columns WHERE table_name='items' AND column_name='item_type'"
    )

    if (result.rows.length === 0) {
      console.log('Adding item_type column to items table...')
      await query('ALTER TABLE items ADD COLUMN item_type VARCHAR(50) DEFAULT \'fan_card\' NOT NULL')
      console.log('✓ Added item_type column')
    } else {
      console.log('✓ item_type column already exists')
    }

    // Check if has_tiers column exists
    const hasTiersResult = await query(
      "SELECT column_name FROM information_schema.columns WHERE table_name='items' AND column_name='has_tiers'"
    )

    if (hasTiersResult.rows.length === 0) {
      console.log('Adding has_tiers column to items table...')
      await query('ALTER TABLE items ADD COLUMN has_tiers BOOLEAN DEFAULT FALSE')
      console.log('✓ Added has_tiers column')
    } else {
      console.log('✓ has_tiers column already exists')
    }

    // Add constraint if it doesn't exist
    try {
      await query(
        "ALTER TABLE items ADD CONSTRAINT chk_item_type CHECK (item_type IN ('fan_card', 'membership_card', 'call_permit', 'vip_access', 'meet_and_greet'))"
      )
      console.log('✓ Added item_type constraint')
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('✓ item_type constraint already exists')
      } else {
        throw err
      }
    }

    // Check if item_tiers table exists
    const tableResult = await query(
      "SELECT table_name FROM information_schema.tables WHERE table_name='item_tiers'"
    )

    if (tableResult.rows.length === 0) {
      console.log('Creating item_tiers table...')
      await query(`
        CREATE TABLE item_tiers (
          id SERIAL PRIMARY KEY,
          item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
          tier_name VARCHAR(50) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          stock INTEGER DEFAULT 0,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(item_id, tier_name)
        )
      `)
      console.log('✓ Created item_tiers table')
      
      // Create indexes
      await query('CREATE INDEX IF NOT EXISTS idx_item_tiers_item_id ON item_tiers(item_id)')
      await query('CREATE INDEX IF NOT EXISTS idx_item_tiers_tier_name ON item_tiers(tier_name)')
      console.log('✓ Created item_tiers indexes')
    } else {
      console.log('✓ item_tiers table already exists')
    }

    console.log('\n✅ Migration completed successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Migration error:', err.message)
    process.exit(1)
  }
}

migrateTables()
