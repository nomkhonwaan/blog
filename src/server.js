import bunyan from 'bunyan'
import compression from 'compression'
import Express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import session from 'express-session'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import LogEntryStream from 'bunyan-mongodb-stream'
import MongoDBStore from 'connect-mongodb-session'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

import { Html } from './components'
import routes from './routes'
import reducers from './reducers'
import webpackConfig from './webpack.config'
import config from './config'
import apiRoutes from './api/routes'
import PromiseMiddleware from './middlewares/PromiseMiddleware'
import Log from './api/models/Log'

export default (app) => {
  if ( ! app instanceof Express) {
    app = Express()
  }

  if ( ! mongoose.connection.readyState) {
    mongoose.connect(config.MONGODB_URI, {
      db: { 
        native_parser: true 
      },
      server: { 
        poolSize: 3 
      },
      replset: { 
        rs_name: 'nomkhonwaan_com' 
      }
    })
  }

  app.disable('x-powered-by')

  app.use(compression({ level: 9 }))
  app.use(helmet())
  app.use(session({
    store: new (MongoDBStore(session))({
      uri: config.MONGODB_URI,
      collection: 'sessions'
    }),
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: true
    }
  }))

  app.use((req, res, next) => {
    if ( ! req.logger) {
      req.logger = bunyan.createLogger({ 
        name: 'nomkhonwaan',
        streams: [
          {
            stream: LogEntryStream({ model: Log })
          }
        ],
        serializers: bunyan.stdSerializers
      })
    }

    if ( ! req.session) {
      req.logger.error('Session is not working!')
    }

    req.logger.info(req.originalUrl)

    return next()
  })

  app.use('/api', apiRoutes)
  app.set('json spaces', 4)
  app.set('json replacer', null)

  app.use('/static', Express.static(webpackConfig.output.path, {
    maxAge: 31536000
  }))

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
        const components = (
          <Provider store={ store }>
            <ReduxAsyncConnect { ...renderProps } />
          </Provider>
        )

        loadOnServer({ ...renderProps, store }).
          then(
            () => {
              try {
                return res.
                  status(200).
                  send('<!DOCTYPE html>' + renderToString(
                    <Html
                      assets={ webpackIsomorphicTools.assets() }
                      components={ components }
                      initialState={ store.getState() } />
                  ))
              } catch (err) {
                return next(err)
              }
            },
            (err) => {
              return next(err)
            }
          )
      }
    })
  })

  app.use((err, req, res, next) => {
    if (err) {
      req.logger.error(err);
    }

    res.send('An error has occurred')
  })

  return app
}
