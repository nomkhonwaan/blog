import mongoose from 'mongoose'
import mongoosastic from 'mongoosastic'

import config from '../../config'

const Log = new mongoose.Schema({
  msg: {
    type: String,
    required: true,
    es_indexed: true
  },
  level: {
    type: Number,
    required: true,
    es_indexed: true
  },
  name: {
    type: String,
    required: true,
    es_indexed: true
  },
  time: {
    type: Date,
    required: true,
    es_indexed: true
  },
  res : {
    type: Object,
    es_indexed: true
  },
  req : {
    type: Object,
    es_indexed: true
  }
}, {
  collection: 'logs'
})

Log.plugin(mongoosastic, {
  hosts: [
    config.ELASTICSEARCH_URI
  ]
})

export default (mongoose.models.Log
  ? mongoose.model('Log')
  : mongoose.model('Log', Log)
)