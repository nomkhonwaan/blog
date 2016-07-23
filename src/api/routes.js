import Express from 'express'

import AttachmentsController from './controllers/AttachmentsController'
import PostsController from './controllers/PostsController'

const router = Express.Router()

// -- PLACE YOUR ROUTES HERE --

router.get('/v1/attachments/:id', AttachmentsController.getOne)
router.get('/v1/posts', PostsController.getAll)
router.get('/v1/posts/:id', PostsController.getOne)

// --

router.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test' && 
      err) {
    req.logger.error(err)
  }
    
  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }

  return res.
    status(400).
    json({
      errors: [{
        status: 400,
        title: 'An error has occurred',
        detail: err
      }]
    })
})

export default router
