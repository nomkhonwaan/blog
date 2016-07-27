import { expect } from 'chai'

import types from '../../../src/constants/ActionTypes'
import reducer, { initialState } from '../../../src/reducers/posts'

describe('reducers/posts.js', () => {
  it('should handle `POSTS_PAGE_CHANGE` by set new page number to state', () => {
    const page = 1

    expect(reducer(undefined, {
      type: types.POSTS_PAGE_CHANGE,
      page
    })).to.deep.equal(Object.assign({}, initialState, {
      page
    }))
    expect(reducer(undefined, {
      type: types.POSTS_PAGE_CHANGE,
      page: page + 1
    })).to.deep.equal(Object.assign({}, initialState, {
      page: page + 1
    }))
    expect(reducer(undefined, {
      type: types.POSTS_PAGE_CHANGE,
      page: page - 1
    })).to.deep.equal(Object.assign({}, initialState, {
      page: page - 1
    }))
  })

  it('should handle `POSTS_PAGE_REQUEST` by toggle `isFetching` to "true"', () => {
    expect(reducer(undefined, {
      type: types.POSTS_PAGE_REQUEST
    })).to.deep.equal(Object.assign({}, initialState, {
      isFetching: true
    }))
  })

  it('should handle `POSTS_PAGE_SUCCESS` by toggle `isFetching` to "false" and parse response data to valid format', () => {
    const receivedAt = Date.now()

    expect(reducer(undefined, {
      type: types.POSTS_PAGE_SUCCESS,
      receivedAt,
      meta: {
        totalItems: 1
      },
      links: {},
      data: [{
        type: 'posts',
        id: 'post-id',
        attributes: {
          slug: 'post-slug'
        }
      }],
      included: []
    })).to.deep.equal(Object.assign({}, initialState, {
      isFetching: false,
      lastUpdated: receivedAt,
      meta: {
        totalItems: 1
      },
      links: {},
      data: {
        1: [ 'post-slug' ]
      },
      included: []
    }))
  })

  it('should handle `POSTS_PAGE_FAILURE` by toggle `isFetching` to "false" and parse errors object', () => {
    const receivedAt = Date.now()

    expect(reducer(undefined, {
      type: types.POSTS_PAGE_FAILURE,
      receivedAt,
      errors: []
    })).to.deep.equal(Object.assign({}, initialState, {
      isFetching: false,
      lastUpdated: receivedAt,
      errors: []
    }))
  })
})
