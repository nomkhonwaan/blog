import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { App } from './components'
import { Login, Posts, Single } from './containers'
import { changePage, changePost } from './actions/PostsActions'

export default ({ dispatch }) => {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ Posts } />
      <Route path="/:year/:month/:date/:slug" getComponent={
        (nextState, callback) => {
          const { params } = nextState

          dispatch(changePost(params.slug));
          callback(null, Single)
        }
      } />
      <Route path="/pages/:page" getComponent={
        (nextState, callback) => {
          const { params } = nextState

          dispatch(changePage(parseInt(params.page)))
          callback(null, Posts)
        }
      } />
      <Route path="/login" component={ Login } />
    </Route>
  )
}
