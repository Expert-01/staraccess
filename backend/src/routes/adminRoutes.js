import express from 'express'
import { addCelebrity, updateCelebrity, deleteCelebrity, addItem } from '../controllers/adminController.js'
import { verifyAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/celebrities', verifyAdmin, addCelebrity)
router.put('/celebrities/:id', verifyAdmin, updateCelebrity)
router.delete('/celebrities/:id', verifyAdmin, deleteCelebrity)
router.post('/celebrities/:id/items', verifyAdmin, addItem)

export default router
