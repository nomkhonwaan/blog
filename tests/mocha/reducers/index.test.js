import { expect } from 'chai'

import types from '../../../src/constants/ActionTypes'
import reducer, { initialState } from '../../../src/reducers'

describe('reducers/index.js', () => {
  it('sholud handle POSTS_POST_SUCCESS and parse post data to posts entities', () => {
    const { entities } = reducer(undefined, {
      type: types.POSTS_POST_SUCCESS,
      data: {
        type: 'posts',
        id: 'post-id-1'
      }
    })

    expect(entities).to.deep.equal(Object.assign({}, initialState, {
      posts: {
        'post-id-1': {
          type: 'posts',
          id: 'post-id-1'
        }
      }
    }))
  })

  it('should handle POSTS_PAGE_SUCCESS and parse posts data to posts entities', () => {
    const { entities } = reducer(undefined, {
      type: types.POSTS_PAGE_SUCCESS,
      data: [{
        type: 'posts',
        id: 'post-id-1'
      }, {
        type: 'posts',
        id: 'post-id-2'
      }]
    })

    expect(entities).to.deep.equal(Object.assign({}, initialState, {
      posts: {
        'post-id-1': {
          type: 'posts',
          id: 'post-id-1'
        },
        'post-id-2': {
          type: 'posts',
          id: 'post-id-2'
        }
      }
    }))
  })
})