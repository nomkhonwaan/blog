import fs from 'fs'
import marked from 'marked'
import mongoose from 'mongoose'
import path from 'path'
import grid from 'gridfs-stream'
import toml from 'toml'

const Schema = mongoose.Schema

let mongodbURI      = 'mongodb://localhost:27017/nomkhonwaan_com'
let postDirectory   = '/Users/natchalua/Sites/blog/content/post'
let uploadDirectory = '/Users/natchalua/Sites/blog/static/uploads'

process.argv.map((item) => {
  const mongodbURIMatches = item.match(/\^-{2}mongodb\-uri\=(.+)/)
  if (mongodbURIMatches) {
    mongodbURI = mongodbURIMatches[1]
  }
  const postDirectoryMatches = item.match(/^\-{2}post\-directory\=(.+)/)
  if (postDirectoryMatches) {
    postDirectory = postDirectoryMatches[1]
  }
  const uploadDirectoryMatches = item.match(/^\-{2}upload\-directory\=(.+)/)
  if (uploadDirectoryMatches) {
    uploadDirectory = uploadDirectoryMatches[1]
  }
})

mongoose.connect(mongodbURI)

const conn = mongoose.connection
grid.mongo = mongoose.mongo

const Post = mongoose.model('Post', new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  publishedAt: Date,
  tags: [ 
    mongoose.Schema.Types.Mixed 
  ],
  users: [ 
    mongoose.Schema.Types.Mixed 
  ],
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
}))
const User = mongoose.model('User', new Schema({
  email: String,
  displayName: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
}, {
  collection: 'users'
}))

conn.once('open', () => {
  Promise.
    all([
      new Promise((resolve, reject) => {
        User.findOne({}, (err, user) => {
          if (err) {
            return reject(err)
          }
          return resolve(user)
        })
      }),
      new Promise((resolve, reject) => {
        fs.readdir(postDirectory, (err, items) => {
          if (err) {
            return reject(err)
          }
          return resolve(items)
        })
      })
    ]). 
    then((values) => {
      const [ user, files ] = values

      files.map((item) => {
        const fileMatches = item.match(/(.+)\.md$/)
        const content = fs.readFileSync(path.resolve(postDirectory, item), 'utf8')
        const [ , metadata, body ] = content.match(/^\+{3}([\s\S]+?)\+{3}([\s\S]+)/)
        
        if (body.length < 100) {
          return
        }

        const { date, tags, title } = toml.parse(metadata)
        const post = new Post({
          publishedAt: new Date(date),
          tags,
          users: [ user ],
          title,
          slug: fileMatches[1],
          markdown: body,
          html: marked(body)
        })
      })
    })
})

function getUploadedImagesUrl(body, prefixDirectory = uploadDirectory) {
  const imageUrlMatches = body.match(/\/uploads\/[\d]+\/[\d]+\.png|jpg|jpeg/g)
  
  return imageUrlMatches.
    map((item) => {
      const [ , directoryName, filename ] 
        = item.match(/^\/uploads\/([\d]+)\/([\d]+\.png|jpg|jpeg)/)

      return path.resolve(prefixDirectory, directoryName, filename)
    })
}