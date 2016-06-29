import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

import APIClient from '../utils/APIClient'
import types from '../constants/ActionTypes'

export const fetchPosts = (page = 1, itemsPerPage = 5) => {
  return {
    types: [ 
      types.POSTS_REQUEST,
      types.POSTS_SUCCESS,
      types.POSTS_FAILURE
    ],
    promise: new APIClient({
      path: '/api/v1/posts',
      query: {
        'page[number]': page,
        'page[size]': itemsPerPage
      }
    })
  }
}

export const changePage = (page) => {
  return {
    type: types.POSTS_PAGE,
    page
  }
}