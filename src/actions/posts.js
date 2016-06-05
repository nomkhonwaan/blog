import { get } from 'superagent'
import superagentPromisePlugin from 'superagent-promise-plugin'

import types from '../constants/actionTypes'

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
  return (dispatch) => {
    dispatch(request())
    
    return get('/api/v1/posts'). 
      use(superagentPromisePlugin).
      query({
        'page[number]': page,
        'page[size]': itemsPerPage 
      }). 
      then(
        ({ body }) => {
          if (body.errors) {
            return dispatch(failure(body))
          }
          return dispatch(success(body))
        },
        (err) => {
          return dispatch(failure({
            errors: [{
              status: 400,
              title: 'An error has occurred',
              detail: err.toString()
            }]
          }))
        }
      )
  }
}