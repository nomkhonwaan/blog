import fs from 'fs'
import Grid from 'gridfs-stream'
import marked from 'marked'
import mongoose from 'mongoose'
import path from 'path'
import toml from 'toml'

import Post from '../api/models/Post'
import User from '../api/models/User'

const config = {
  MONGODB_URI: 'mongodb://localhost:27017/nomkhonwaan_com',
  POST_DIRECTORY: '/Users/nomkhonwaan/Sites/blog/content/post',
  UPLOADS_DIRECTORY: '/Users/nomkhonwaan/Sites/blog/static/uploads'
}

// -- CLI parameters --

process.argv.map((item) => {
  const matches = item.match(/^\-{2}(.+?)\=(.+)/)

  if ( ! Array.isArray(matches)) {
    return
  }

  const [ , key, value ] = matches

  switch (key) {
    case 'mongodb-uri': {
      config.MONGODB_URI = value
      break;
    }
    case 'post-directory': {
      config.POST_DIRECTORY = value
      break;
    }
    case 'uploads-directory': {
      config.UPLOADS_DIRECTORY = value
      break;
    }
  }
})

// --

mongoose.connect(config.MONGODB_URI, (err) => {
  if (err) {
    console.log('%s [error] %s',
        new Date().toString(),
        err);
  }
})
const conn = mongoose.connection

conn.once('open', () => {
  const gfs = Grid(conn.db, mongoose.mongo)

  Promise.
    all([
      // retrieve user model
      new Promise((resolve, reject) => {
        new User({
          email: 'me@nomkhonwaan.com',
          displayName: 'Natcha Luang - Aroonchai'
        }).
        save((err, user) => {
          if (err) return reject(err)
          return resolve(user)
        })
      }),
      // read post directory
      new Promise((resolve, reject) => {
        fs.readdir(config.POST_DIRECTORY, (err, items) => {
          if (err) return reject(err)
          return resolve(items)
        })
      })
    ]).
    then((values) => {
      const [ user, files ] = values

      files.map((item, key) => {
        const matches = item.match(/(.+)\.(md|markdown)$/)
        const content = fs.readFileSync(path.resolve(config.POST_DIRECTORY, item), 'utf8')
        const [ , meta, body ] = content.match(/^\+{3}([\s\S]+?)\+{3}([\s\S]+)/)

        if ( ! Array.isArray(matches)) {
          return
        }

        if (body.length < 100) {
          return
        }

        // -- parse metadata --

        const { id, date, tags, title } = toml.parse(meta)

        // --

        // -- save attachments --

        const saveAttachments = getAttachedImagesUrl(body, config.UPLOADS_DIRECTORY).
          map((item) => {
            return new Promise((resolve) => {
              const ws = gfs.createWriteStream({
                filename: path.basename(item)
              })

              fs.createReadStream(item). pipe(ws)
              ws.on('close', (file) => {
                return resolve(file)
              })
            })
          })

        // --

        // -- save posts --

        Promise.
          all(saveAttachments).
          then((values) => {
            let markdown = body

            const attachments = values.
              map((item) => {
                markdown =
                  markdown.replace(/\(\/uploads\/\d+\/.+\..+\)/g,
                    `(/api/v1/attachments/${item._id.toString()})`)

                return {
                  id: item._id
                }
              })

            new Post({
              markdown,
              title,
              attachments,
              html: marked(markdown),
              slug: matches[1],
              tags: tags.
                map((item) => {
                  return {
                    name: item,
                    slug: item.toLowerCase()
                  }
                }),
              users: [ {
                id: user._id,
                email: user.email,
                displayName: user.displayName
              } ],
              publishedAt: new Date(date)
            }).
            save((err) => {
              if (err) {
                console.log('%s [error] %s',
                  new Date().toString(),
                  err)
              } else {
                console.log('%s [info] post [%s] had saved',
                  new Date().toString(),
                  title)
              }
            })
          }, (err) => {
            console.log('%s [error] %s',
              new Date().toString(),
              err);
          })
        // --

      })
    }, (err) => {
      console.log('%s [error] %s',
        new Date().toString(),
        err);
    }).
    catch((err) => {
      console.log('%s [error] %s',
        new Date().toString(),
        err);
    })
})

// -- utilities --

function getAttachedImagesUrl(str, uploaddir) {
  const matches = str.match(/\(\/uploads\/\d+\/.+\..+\)/g)

  if ( ! Array.isArray(matches)) {
    return []
  }

  return matches.
    map((item) => {
      const [ , dirname, filename ] =
        item.match(/^\(\/uploads\/(\d+)\/(.+\.(gif|jpg|jpeg|png))\)$/)

      return path.
        resolve(uploaddir, dirname, filename)
    })
}

// --
