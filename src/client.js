import React from 'react'
import { applyMiddleware, createStore, compose } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyRouterMiddleware, browserHistory, Router } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import { persistState } from 'redux-devtools'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import useScroll from 'react-router-scroll'

import PromiseMiddleware from './middlewares/PromiseMiddleware'
import reducers from './reducers'
import routes from './routes'

const initialState = window.__INITIAL_STATE__
const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(
      PromiseMiddleware,
      routerMiddleware(browserHistory)
    )
  ),
  window.devToolsExtension && window.devToolsExtension(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={ store }>
    <Router render={ (renderProps) => {
      return (
        <ReduxAsyncConnect { ...renderProps }
          render={ applyRouterMiddleware(useScroll()) } />
      )
    } } history={ history }>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('root')
)