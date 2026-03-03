import dotenv from 'dotenv'
import { query } from '../src/db.js'

// script to delete celebrities by name

dotenv.config()

const NAMES_TO_REMOVE = ['Luke Perry', 'Jay-Z']

const removeCelebrities = async () => {
  try {
    console.log('🔍 Removing celebrities:', NAMES_TO_REMOVE)
    for (const name of NAMES_TO_REMOVE) {
      const res = await query('DELETE FROM celebrities WHERE name = $1 RETURNING id, name', [name])
      if (res.rowCount > 0) {
        console.log(`✅ Removed ${res.rowCount} row(s) for ${name}`)
      } else {
        console.log(`⚠️  No record found for ${name}`)
      }
    }
    console.log('🎯 Done')
  } catch (err) {
    console.error('Error removing celebrities:', err)
  } finally {
    process.exit()
  }
}

removeCelebrities()
