import express from 'express'
import { addCelebrity, updateCelebrity, deleteCelebrity, addItem } from '../controllers/adminController.js'
import { verifyAdmin } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// Initialize Supabase client for storage
const supabaseUrl = process.env.SUPABASE_URL || 'https://hvgommfahrqadocbmssn.supabase.co'
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2Z29tbWZhaHJxYWRvY2Jtc3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4MTk2NDAsImV4cCI6MjAxODM5NTY0MH0.EKJwJKvWLRF7z-8t_UHVkVHl4nDrNjXq5_xCl4q1W9g'
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
