import mongoose from 'mongoose'

export const Model = (mongoose.models.User
  ? mongoose.model('User')
  : mongoose.model('User', new mongoose.Schema({
    createdAt: {
      type: Date,
      default: Date.now
    },
    updateAt: Date,
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    displayName: {
      type: String,
      required: true
    }
  })))