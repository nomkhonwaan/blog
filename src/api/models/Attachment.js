/**
 * External Dependencies
 */
const Grid = require('gridfs-stream');
const fs = require('fs');
const mongoose = require('mongoose');

// Replace Cursor.nextObject because it was removed from node-mongodb-native library
// https://github.com/aheckmann/gridfs-stream/issues/125
eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);

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