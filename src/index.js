import Express from 'express'
import path from 'path'

import config from './config'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools'
import webpackIsomorphicToolsConfiguration from './webpack-isomorphic-tools-configuration'

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfiguration)
  .development(process.env.NODE_ENV === 'development')
  .server(path.resolve(__dirname, '..'), () => {
    const app = Express()
    const server = require('./server').
      default(app).
      listen(config.PORT, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Server listening at http://%s:%s',
            server.address().address,
            server.address().port)
          console.log('Press Ctrl+C to quit.')
        }
      })
  })