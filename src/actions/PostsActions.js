import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

import APIClient from '../utils/APIClient'
import types from '../constants/ActionTypes'

export const changePage = function (page) {
  return {
    type: types.POSTS_PAGE_CHANGE,
    page
  }
}

export const changePost = function (slug) {
  return {
    type: types.POSTS_POST_CHANGE,
    slug
  }
}

export const fetchPost = function(slugOrID) {
  return {
    types: [
      types.POSTS_POST_REQUEST,
      types.POSTS_POST_SUCCESS,
      types.POSTS_POST_FAILURE
    ],
    promise: new APIClient({
      path: `/api/v1/posts/${slugOrID}`
    })
  }
}

export const fetchPosts = function (page = 1, itemsPerPage = 5) {
  return {
    types: [
      types.POSTS_PAGE_REQUEST,
      types.POSTS_PAGE_SUCCESS,
      types.POSTS_PAGE_FAILURE
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

export const togglePopupPost = function (isPopup = false) {
  return {
    type: types.POSTS_TOGGLE_POPUP_POST,
    isPopup: ! isPopup
  }
}
