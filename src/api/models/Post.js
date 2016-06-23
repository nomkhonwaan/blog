import mongoose from 'mongoose'

export default (mongoose.models.Post
  ? mongoose.model('Post')
  : mongoose.model('Post', new mongoose.Schema({
    attachments: [ {
      id: mongoose.Schema.Types.ObjectId,
      title: String
    } ],
    html: String,
    markdown: String,
    mimeType: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    tags: [ {
      name: String,
      slug: {
        type: String,
        index: true
      }
    } ],
    title: {
      type: String,
      required: true
    },
    users: [ {
      id: mongoose.Schema.Types.ObjectId,
      email: String,
      displayName: String
    } ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date,
    publishedAt: Date,
  }, {
    collection: 'posts'
  }))
)