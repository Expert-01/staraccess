import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  image: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: String,
  bio: String,
  image: String,
  followers: Number,
  yearsActive: String,
  responseTime: String,
  items: [itemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Celebrity', celebritySchema)
