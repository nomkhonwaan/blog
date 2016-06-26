import { expect } from 'chai'
import path from 'path'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

import WebpackIsomorphicTools from 'webpack-isomorphic-tools'
import webpackIsomorphicToolsConfiguration from '../../src/webpack-isomorphic-tools-configuration'

import Author from '../../src/components/Author'

const webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfiguration)

xdescribe('components/Author.jsx', () => {
  it('should render correctly', (done) => {
    webpackIsomorphicTools.server(path.resolve(__dirname, '..', '..'), () => {
      done()
    })
  })
})