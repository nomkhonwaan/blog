import { get } from 'superagent'
import superagentPromisePlugin from 'superagent-promise-plugin'

import types from '../constants/ActionTypes'

superagentPromisePlugin.Promise = Promise 

const request = () => {
  return {
    type: types.POSTS_REQUEST
  }
}

const failure = (err) => {
  return {
    ...err,
    receivedAt: Date.now(),
    type: types.POSTS_FAILURE
  }
}

const success = (body) => {
  return {
    ...body,
    receivedAt: Date.now(),
    type: types.POSTS_SUCCESS
  }
}

export const fetchPosts = (page = 1, itemsPerPage = 5) => {
  return {
    types: [ 
      types.POSTS_REQUST,
      types.POSTS_SUCCESS,
      types.POSTS_FAILURE
    ],
    promise: get('/api/v1/posts'). 
      use(superagentPromisePlugin). 
      query({
        'page[number]': page,
        'page[size]': itemsPerPage
      })
  }
}