import dotenv from 'dotenv'
import { query } from '../src/db.js'

dotenv.config()

const checkPrices = async () => {
  try {
    console.log('🔍 Checking item_tiers prices in database...\n')

    const result = await query(`
      SELECT 
        it.id,
        it.item_id,
        i.name as item_name,
        c.name as celebrity_name,
        it.tier_name,
        it.price,
        it.stock
      FROM item_tiers it
      JOIN items i ON it.item_id = i.id
      JOIN celebrities c ON i.celebrity_id = c.id
      ORDER BY c.name, i.name, it.price
    `)

    if (result.rows.length === 0) {
      console.log('❌ No item tiers found in database')
      process.exit(0)
    }

    console.log(`Found ${result.rows.length} item tiers:\n`)
    console.log('Celebrity | Item | Tier | Price | Stock')
    console.log('-'.repeat(60))

    let currentCelebrity = ''
    let currentItem = ''

    result.rows.forEach(row => {
      if (row.celebrity_name !== currentCelebrity) {
        currentCelebrity = row.celebrity_name
        console.log(`\n📍 ${currentCelebrity}`)
      }

      if (row.item_name !== currentItem) {
        currentItem = row.item_name
        console.log(`  📦 ${currentItem}`)
      }

      const priceStatus = row.price === null || row.price === 0 ? '⚠️ ' : '✓ '
      console.log(`    ${priceStatus}${row.tier_name.padEnd(12)} | $${row.price} | Stock: ${row.stock}`)
    })

    console.log('\n' + '='.repeat(60))

    // Summary
    const nullPrices = result.rows.filter(r => r.price === null).length
    const zeroPrices = result.rows.filter(r => r.price === 0).length
    const validPrices = result.rows.filter(r => r.price !== null && r.price > 0).length

    console.log(`\n📊 Summary:`)
    console.log(`  ✓ Valid prices: ${validPrices}`)
    console.log(`  ⚠️  Null prices: ${nullPrices}`)
    console.log(`  ⚠️  Zero prices: ${zeroPrices}`)

    if (nullPrices > 0 || zeroPrices > 0) {
      console.log('\n❌ Issues detected - some prices are missing or zero!')
    } else {
      console.log('\n✅ All prices look good!')
    }

    process.exit(0)
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

checkPrices()
