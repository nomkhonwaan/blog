import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

import types from '../constants/ActionTypes'

export const fetchPosts = (page = 1, itemsPerPage = 5) => {
  return {
    types: [ 
      types.POSTS_REQUEST,
      types.POSTS_SUCCESS,
      types.POSTS_FAILURE
    ],
    promise: fetch(`http://beta.nomkhonwaan.com/api/v1/posts?${querystring.stringify({
        'page[number]': page,
        'page[size]': itemsPerPage
      })}`). 
      then((res) => {
        return res.json()
      })
  }
}

export const changePage = (page) => {
  return {
    type: types.POSTS_PAGE,
    page
  }
}