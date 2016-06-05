import { expect } from 'chai'

import types from '../../src/constants/ActionTypes'
import reducer, { initialState } from '../../src/reducers/posts'

describe('reducers/posts.js', () => {
  it('should handle POSTS_REQUEST by toggle isFetching to "true"', () => {
    expect(reducer(undefined, {
      type: types.POSTS_REQUEST
    })).to.deep.equal(Object.assign({}, initialState, {
      isFetching: true
    }))
  })
  
  it('should handle POSTS_SUCCESS by toggle isFetching to "false" and parse response data to valid format', () => {
    const receivedAt = Date.now()
    
    expect(reducer(undefined, {
      type: types.POSTS_SUCCESS,
      receivedAt,
      meta: {
        totalItems: 1
      },
      links: {},
      data: [{
        type: 'posts',
        id: 'post_ID'
      }],
      included: []
    })).to.deep.equal(Object.assign({}, initialState, {
      isFetching: false,
      lastUpdated: receivedAt,
      meta: {
        totalItems: 1
      },
      links: {},
      data: [ 'post_ID' ],
      included: []
    }))
  })
  
  it('should handle POSTS_FAILURE by toggle isFetching to "false" and parse errors object', () => {
    const receivedAt = Date.now()
    
    expect(reducer(undefined, {
      type: types.POSTS_FAILURE,
      receivedAt,
      errors: []
    })).to.deep.equal(Object.assign({}, initialState, {
      isFetching: false,
      lastUpdated: receivedAt,
      errors: []
    }))
  })
})