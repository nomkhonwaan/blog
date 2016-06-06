import Express from 'express'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createMemoryHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'

import routes from './routes'
import reducers from './reducers'

export default (app) => {
  if ( ! app instanceof Express) {
    app = Express()
  }
  
  app.use((req, res, next) => {
    const store = createStore(reducers)
    const initialState = store.getState()
    const history = syncHistoryWithStore(createMemoryHistory(req.originalUrl), store)
    
    match({
      routes, 
      location: req.originalUrl,
      history
    }, (err, redirect, renderProps) => {
      if (err) {
        return next(err)
      } else if (redirect) {
        return res.redirect(redirect)
      } else if (renderProps) {
        const components = (
          <Provider store={store}>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        )
        
        return res.
          status(200). 
          send('<!DOCTYPE html>' + renderToString(components))
        // loadOnServer({ ...renderProps, store }). 
        //   then(
        //     (result) => {
        //       return res.
        //         status(200). 
        //         send('<!DOCTYPE html>' + renderToString(components))
        //     },
        //     (err) => {
        //       return next(err)
        //     }
        //   )
      }
    })
  })
  
  return app
}