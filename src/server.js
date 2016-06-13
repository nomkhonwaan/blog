import compression from 'compression'
import Express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import RedisStore from 'connect-redis'
import session from 'express-session'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'

import { Html } from './components'
import routes from './routes'
import reducers from './reducers'
import webpackConfig from './webpack.config'
import apiRoutes from './api/routes'
import config from './config/defaults'
import PromiseMiddleware from './middlewares/PromiseMiddleware'

export default (app) => {
  if ( ! app instanceof Express) {
    app = Express()
  }
  
  if ( ! mongoose.connection.readyState) {
    mongoose.connect(config.MONGODB_URI)
  }
  
  app.disable('x-powered-by')
  
  app.use(compression({ level: 9 }))
  app.use(helmet())
  app.use(session({
    store: new (RedisStore(session))({
      url: config.REDIS_URL
    }),
    secret: config.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true
    }
  }))
  
  app.use('/api', apiRoutes)
  app.set('json spaces', 4)
  app.set('json replacer', null)

  app.use('/static', Express.static(webpackConfig.output.path, { 
    maxAge: 86400000 * 365
  }))
  
  app.use((req, res, next) => {
    if ( ! req.session) {
      console.log('%s [error] Redis session is not working!', 
        new Date().toString())
    }
    
    console.log('%s [info] %s', 
      new Date().toString(),
      req.originalUrl)
      
    return next()
  })
  
  app.use((req, res, next) => {
    const store = createStore(reducers, undefined, 
      applyMiddleware(
        PromiseMiddleware
      )
    )
    
    const history = syncHistoryWithStore(createMemoryHistory(req.originalUrl), store)
    
    match({
      routes: routes(store), 
      location: req.url,
      history
    }, (err, redirect, renderProps) => {
      if (err) {
        return next(err)
      } else if (redirect) {
        return res.redirect(redirect)
      } else if (renderProps) {
        const initialState = store.getState()
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
                    assets={ webpackIsomorphicTools.assets() }
                    components={ components }
                    initialState={ initialState } />
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