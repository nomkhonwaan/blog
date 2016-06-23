import mongoose from 'mongoose'

export const publicFields = [
  'title',
  'slug',
  'publishedAt',
  'html',
  'tags',
  'users'
]

export default (mongoose.models.Post
  ? mongoose.model('Post')
  : mongoose.model('Post', new mongoose.Schema({
    attachments: [ mongoose.Schema.Types.Mixed ],
    html: String,
    markdown: String,
    slug: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    tags: [ mongoose.Schema.Types.Mixed ],
    title: {
      type: String,
      required: true
    },
    users: [ mongoose.Schema.Types.Mixed ],
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
