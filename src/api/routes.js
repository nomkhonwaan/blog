import Express from 'express'
import PostsController from './controllers/PostsController'

const router = Express.Router()

// -- PLACE YOUR ROUTES HERE --

router.get('/v1/posts', PostsController.getAll)

// --

router.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('%s [error] %s', new Date().toString(), err)
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
