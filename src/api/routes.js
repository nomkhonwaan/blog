import Express from 'express'
import PostsController from './controllers/PostsController'

const router = Express.Router()

// -- PLACE YOUR ROUTES HERE --

router.get('/v1/posts', PostsController.getAll)
router.get('/v1/posts/:id', PostsController.getOne)

// --

router.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test' &&
      err) {
    req.logger.error(err)
  }

  res.
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
