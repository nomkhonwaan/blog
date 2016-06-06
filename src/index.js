import Express from 'express'

const app = Express()

const server = require('./server').
  default(app).
  listen(process.env.PORT || 8080, '0.0.0.0', (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Server listening at http://%s:%s',
        server.address().address,
        server.address().port)
      console.log('Press Ctrl+C to quit.')
    }
  })