import express from 'express'
import { addCelebrity, updateCelebrity, deleteCelebrity, addItem } from '../controllers/adminController.js'
import { verifyAdmin } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = express.Router()

router.post('/celebrities', verifyAdmin, addCelebrity)
router.put('/celebrities/:id', verifyAdmin, updateCelebrity)
router.delete('/celebrities/:id', verifyAdmin, deleteCelebrity)
router.post('/celebrities/:id/items', verifyAdmin, addItem)

// Photo upload endpoint using local filesystem
router.post('/celebrities/upload-photo', verifyAdmin, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(__dirname, '../..', 'uploads/celebrities')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const ext = req.file.originalname.split('.').pop()
    const filename = `${uuidv4()}.${ext}`
    const filepath = path.join(uploadsDir, filename)

    // Write file to disk
    fs.writeFileSync(filepath, req.file.buffer)

    res.json({
      message: 'Photo uploaded successfully',
      filename: filename,
      path: `/uploads/celebrities/${filename}`
    })
  } catch (err) {
    console.error('Upload error:', err)
    res.status(500).json({ message: err.message })
  }
})
export default router
