import { combineReducers } from 'redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { routerReducer } from 'react-router-redux'

import types from '../constants/ActionTypes'
import nav from './nav'
import posts from './posts'

const initialState = {
  posts: {},
  users: {}
}

const entities = function (state = initialState, action) {
  switch (action.type) {
    case types.POST_SUCCESS:
    case types.POSTS_SUCCESS: {
      return Object.assign({}, state, {
        posts: (Array.isArray(action.data)
          ? action.
              data. 
              reduce((result, item) => {
                result[item.id] = item
                return result
              }, state.posts)
          : (() => {
              state.posts[action.data.id] = action.data
              return state.posts
            })())
      })
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  nav,
  posts,
  entities
})