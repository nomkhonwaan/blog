import Express from 'express'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'

import { Html } from './components'
import PromiseMiddleware from './middlewares/PromiseMiddleware'
import routes from './routes'
import reducers from './reducers'

export default (app) => {
  if ( ! app instanceof Express) {
    app = Express()
  }
  
  app.use((req, res, next) => {
    const store = createStore(reducers, undefined, 
      applyMiddleware(
        PromiseMiddleware
      )
    )
    
    const initialState = store.getState()
    const history = syncHistoryWithStore(createMemoryHistory(req.originalUrl), store)
    
    match({
      routes, 
      location: req.url,
      history
    }, (err, redirect, renderProps) => {
      if (err) {
        return next(err)
      } else if (redirect) {
        return res.redirect(redirect)
      } else if (renderProps) {
        const components = (
          <Provider store={ store }>
            <ReduxAsyncConnect { ...renderProps } />
          </Provider>
        )
        
        loadOnServer({ ...renderProps, store }). 
          then(
            () => {
              return res.
                status(200). 
                send('<!DOCTYPE html>' + renderToString(
                  <Html 
                    components={ components }/>
                ))
            },
            (err) => {
              console.log(err);
              return next(err)
            }
          )
      }
    })
  })
  
  return app
}