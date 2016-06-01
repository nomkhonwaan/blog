import mongoose from 'mongoose'

export const publicFields = [
  'title',
  'slug',
  'publishedAt',
  'html',
  'tags',
  'users'
]

export const PostModel = (mongoose.models.Post
  ? mongoose.model('Post')
  : mongoose.model('Post', new mongoose.Schema({
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date,
    publishedAt: Date,
    tags: [ mongoose.Schema.Types.Mixed ],
    users: [ mongoose.Schema.Types.Mixed ],
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },
    markdown: String,
    html: String
  }, {
    collection: 'posts'
  })
))

export default {

  getIndex: (req, res, next) => {
    try {

    } catch (err) {

    }
  }

}
