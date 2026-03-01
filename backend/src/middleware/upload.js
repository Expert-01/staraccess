import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

// Use memory storage instead of disk storage for Render compatibility
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  // Allow only image files
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP)'), false)
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
})
