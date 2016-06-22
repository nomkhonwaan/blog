import fs from 'fs'
import marked from 'marked'
import mime from 'mime'
import mongoose from 'mongoose'
import path from 'path'
import grid from 'gridfs-stream'
import toml from 'toml'

import { Model as PostModel } from '../api/PostsController'
import { Model as UserModel } from '../api/UsersController'

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

conn.once('open', () => {
  Promise.
    all([
      new Promise((resolve, reject) => {
        UserModel.findOne({}, (err, user) => {
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
      
      files.map((item, key) => {
        const fileMatches = item.match(/(.+)\.md$/)
        const content = fs.readFileSync(path.resolve(postDirectory, item), 'utf8')
        const [ , metadata, body ] = content.match(/^\+{3}([\s\S]+?)\+{3}([\s\S]+)/)
        
        if (body.length < 100) {
          return
        }

        const { date, tags, title } = toml.parse(metadata)
        const post = new PostModel({
          publishedAt: new Date(date),
          attachedImages: getAttachedImagesUrl(body).
            map((uploadedImage) => {
              return {
                data: fs.readFileSync(uploadedImage, 'utf8'),
                mimeType: mime.lookup(uploadedImage)
              }
            }),
          tags: tags. 
            map((item) => {
              return {
                name: item,
                slug: item.toLowerCase()
              }
            }),
          users: [ user ],
          title,
          slug: fileMatches[1],
          markdown: body,
          html: marked(body)
        })

console.log(tags. 
            map((item) => {
              return {
                name: item,
                slug: item.toLowerCase()
              }
            }))
        post.save((err) => {
          if (err) {
            console.log('%s [error] %s',
              new Date().toString(),
              err)
          } else {
            console.log('%s [info] saving post number [%d], done',
              new Date().toString(),
              key)
          }
        })
      })
    }, (err) => {
      console.log('%s [error] %s',
        new Date().toString(),
        err)
    })
})

function getAttachedImagesUrl(body, prefixDirectory = uploadDirectory) {
  const imageUrlMatches = body.match(/\/uploads\/[\d]+\/[\d]+\.(png|jpg|jpeg)/g)

  if ( ! Array.isArray(imageUrlMatches)) {
    return []
  }

  return imageUrlMatches.
    map((item) => {
      const [ , directoryName, filename ] 
        = item.match(/^\/uploads\/([\d]+)\/([\d]+\.(png|jpg|jpeg))/)

      return path.resolve(prefixDirectory, directoryName, filename)
    })
}