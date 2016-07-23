import fs from 'fs'
import Grid from 'gridfs-stream'
import mongoose from 'mongoose'

// --

const Attachment = {}
export default Attachment

// --

Attachment.findOne = function (id) {
  const gfs = Grid(mongoose.connection.db, mongoose.mongo)
  
  return Promise.
    all([
      new Promise((resolve, reject) => {
        gfs.
          findOne({ _id: id }, (err, item) => {
            if (err) {
              return reject(err)
            }
            return resolve(item)
          })
      }),
      Promise.
        resolve(gfs.createReadStream({ _id: id }))
    ])
}