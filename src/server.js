import Express from 'express'

import { createStore } from 'redux'

export default (app) => {
  if ( ! app instanceof Express) {
    app = Express()
  }
  
  app.use((req, res, next) => {
  })
  
  return app
}