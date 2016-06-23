import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { App } from './components'
import { Post, Posts } from './containers'
import { changePage } from './actions/PostsActions'

export default ({ dispatch }) => {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ Posts } />
      <Route path="/:year/:month/:date/:slug" component={ Post } />
      <Route path="/pages/:page" getComponent={
        (nextState, callback) => {
          const { params } = nextState

          dispatch(changePage(parseInt(params.page)))
          callback(null, Posts)
        }
      } />
    </Route>
  )
}
