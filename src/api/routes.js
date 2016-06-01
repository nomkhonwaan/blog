import Express from 'express'
import Posts from './posts'

const router = Express.Router()

router.use((req, res, next) => {
  res.
    set({
      'Content-Type': 'application/vnd.api+json'
    })

  return next()
})

// -- PLACE YOUR ROUTES HERE --

router.get('/posts', Posts.getIndex)

// --

router.use((err, req, res, next) => {
  if (err) {
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
