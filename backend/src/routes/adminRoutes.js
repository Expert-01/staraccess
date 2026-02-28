import express from 'express'
import { addCelebrity, updateCelebrity, deleteCelebrity, addItem } from '../controllers/adminController.js'
import { verifyAdmin } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

router.post('/celebrities', verifyAdmin, addCelebrity)
router.put('/celebrities/:id', verifyAdmin, updateCelebrity)
router.delete('/celebrities/:id', verifyAdmin, deleteCelebrity)
router.post('/celebrities/:id/items', verifyAdmin, addItem)

// Photo upload endpoint
router.post('/celebrities/upload-photo', verifyAdmin, upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const photoPath = `/uploads/celebrities/${req.file.filename}`
    res.json({
      message: 'Photo uploaded successfully',
      path: photoPath,
      filename: req.file.filename
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
