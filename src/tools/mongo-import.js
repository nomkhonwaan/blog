import fs from 'fs'
import Grid from 'gridfs-stream'
import marked from 'marked'
import mime from 'mime'
import mongoose from 'mongoose'
import path from 'path'
import toml from 'toml'

import Post from '../api/models/Post'
import User from '../api/models/User'

process.on('uncaughtException', function (error) {
   console.log(error.stack);
});
const config = {
  MONGODB_URI: 'mongodb://localhost:27017/nomkhonwaan_com',
  POST_DIRECTORY: '~/Sites/blog/content/post',
  UPLOADS_DIRECTORY: '~/Sites/blog/static/uploads'
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
        User.findOne({}, (err, user) => {
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
        const content = fs.readFileSync(
          path.resolve(config.POST_DIRECTORY, item),
          'utf8')
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
        const attachments = getAttachedImagesUrl(body, config.UPLOADS_DIRECTORY). 
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
          all(attachments). 
          then((values) => {
            let markdown = body

            values. 
              map((item) => {
                markdown = 
                  markdown.replace(/\(\/uploads\/\d+\/.+\..+\)/g, 
                    `(/api/v1/attachments/${item._id.toString()})`)
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
