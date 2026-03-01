import express from 'express'
import { getItemById, getCelebrityItems, getItemTier } from '../controllers/itemController.js'

const router = express.Router()

// Get all items for a celebrity
router.get('/celebrity/:celebrityId', getCelebrityItems)

// Get specific item details with tiers
router.get('/celebrity/:celebrityId/item/:itemId', getItemById)

// Get specific tier details
router.get('/:itemId/tier/:tierId', getItemTier)

export default router
