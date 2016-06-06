import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { App } from './components'
import { Posts } from './containers'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Posts} />
  </Route>
)