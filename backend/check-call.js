import dotenv from 'dotenv'
import { query } from './src/db.js'

dotenv.config()

const check = async () => {
  try {
    const res = await query(
      `SELECT it.id, it.price, i.item_type, c.name FROM item_tiers it
       JOIN items i ON i.id = it.item_id
       JOIN celebrities c ON c.id = i.celebrity_id
       WHERE i.item_type='call_permit';`
    )
    console.log('call permit tiers (before update):')
    console.table(res.rows)

    const upd = await query(
      `UPDATE item_tiers
       SET price = 300
       FROM items
       WHERE item_tiers.item_id = items.id
         AND items.item_type = 'call_permit'
         AND item_tiers.price <> 300
       RETURNING item_tiers.id, item_tiers.price`);
    console.log('updated rows:')
    console.table(upd.rows)

    const res2 = await query(
      `SELECT it.id, it.price, i.item_type, c.name FROM item_tiers it
       JOIN items i ON i.id = it.item_id
       JOIN celebrities c ON c.id = i.celebrity_id
       WHERE i.item_type='call_permit';`
    )
    console.log('call permit tiers (after update):')
    console.table(res2.rows)
  } catch (err) {
    console.error(err)
  } finally {
    process.exit()
  }
}

check()
