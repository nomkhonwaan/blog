import Attachment from '../models/Attachment'

function onReadStreamError (next) {
  return (err) => {
    return next(err)
  }
}

// --

const AttachmentsController = {}
export default AttachmentsController

// --

AttachmentsController.getOne = function (req, res, next) {
  try {
   Attachment.
    findOne(req.params.id).
    then(
      ([ metadata, readStream ]) => {
        readStream.on('error', onReadStreamError(next))
        res.
          set({
            'Content-Type': metadata.contentType
          })
          
        return readStream.pipe(res)
      },
      (err) => {
        return next(err)
      }
    )
  } catch (err) {
    return next(err)
  }
}