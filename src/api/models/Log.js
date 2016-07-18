import mongoose from 'mongoose'

export default (mongoose.models.Log
  ? mongoose.model('Log')
  : mongoose.model('Log', new mongoose.Schema({
    msg: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      required: true
    },
    res : {
      type: Object
    },
    req : {
      type: Object
    }
  })))