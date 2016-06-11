import { get } from 'superagent'
import superagentNodePlugin from 'superagent-node-plugin'
import superagentPromisePlugin from 'superagent-promise-plugin'

import types from '../constants/ActionTypes'

superagentPromisePlugin.Promise = Promise 

export const fetchPosts = (page = 1, itemsPerPage = 5) => {
  return {
    types: [ 
      types.POSTS_REQUEST,
      types.POSTS_SUCCESS,
      types.POSTS_FAILURE
    ],
    promise: get('/api/v1/posts').
      use(superagentNodePlugin()).
      use(superagentPromisePlugin). 
      query({
        'page[number]': page,
        'page[size]': itemsPerPage
      })
  }
}

export const changePage = (page) => {
  return {
    type: types.POSTS_PAGE,
    page
  }
}