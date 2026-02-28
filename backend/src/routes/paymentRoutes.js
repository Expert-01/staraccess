import express from 'express'
import { processPayment, getOrders } from '../controllers/paymentController.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/process', verifyToken, processPayment)
router.get('/orders', verifyToken, getOrders)

export default router
