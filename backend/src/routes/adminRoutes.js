import express from 'express'
import { addCelebrity, updateCelebrity, deleteCelebrity, addItem } from '../controllers/adminController.js'
import { verifyAdmin } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// Extract Supabase URL from DB_URL if SUPABASE_URL not explicitly set
function extractSupabaseUrl() {
  if (process.env.SUPABASE_URL) {
    return process.env.SUPABASE_URL
  }

  // Extract from DB_URL: postgresql://postgres.{projectId}:...
  const dbUrl = process.env.DB_URL || process.env.DATABASE_URL
  if (dbUrl) {
    const projectIdMatch = dbUrl.match(/postgres\.([a-z0-9]+)/)
    if (projectIdMatch && projectIdMatch[1]) {
      const projectId = projectIdMatch[1]
      return `https://${projectId}.supabase.co`
    }
  }

  throw new Error('Unable to determine Supabase URL. Set SUPABASE_URL environment variable or ensure DB_URL is properly configured.')
}

// Initialize Supabase client for storage
const supabaseUrl = extractSupabaseUrl()
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
if (!supabaseAnonKey) {
  throw new Error('SUPABASE_ANON_KEY environment variable is not set')
}
const supabase = createClient(supabaseUrl, supabaseAnonKey)

router.post('/celebrities', verifyAdmin, addCelebrity)
router.put('/celebrities/:id', verifyAdmin, updateCelebrity)
router.delete('/celebrities/:id', verifyAdmin, deleteCelebrity)
router.post('/celebrities/:id/items', verifyAdmin, addItem)

// Photo upload endpoint using Supabase Storage
router.post('/celebrities/upload-photo', verifyAdmin, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Generate unique filename
    const ext = req.file.originalname.split('.').pop()
    const filename = `${uuidv4()}.${ext}`
    const filepath = `celebrities/${filename}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('celebrity-images')
      .upload(filepath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return res.status(500).json({ message: 'Failed to upload image', error: error.message })
    }

    // Get public URL for the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from('celebrity-images')
      .getPublicUrl(filepath)

    res.json({
      message: 'Photo uploaded successfully',
      filename: filename,
      imageUrl: publicUrlData.publicUrl
    })
  } catch (err) {
    console.error('Upload error:', err)
    res.status(500).json({ message: err.message })
  }
})

export default router
