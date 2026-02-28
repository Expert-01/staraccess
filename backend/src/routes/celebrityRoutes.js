import express from 'express'
import { getAllCelebrities, getCelebrityById } from '../controllers/celebrityController.js'

const router = express.Router()

router.get('/', getAllCelebrities)
router.get('/:id', getCelebrityById)

export default router
