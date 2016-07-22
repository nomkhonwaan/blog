import { expect } from 'chai'

import types from '../../../src/constants/ActionTypes'
import reducer from '../../../src/reducers'

describe('reducers/index.js', () => {
  it('sholud handle POST_SUCCESS and parse post data to posts entities', () => {
    const { entities } = reducer(undefined, {
      type: types.POST_SUCCESS,
      data: {
        type: 'posts',
        id: 'post-id-1'
      }
    })

    expect(entities).to.deep.equal({
      posts: {
        'post-id-1': {
          type: 'posts',
          id: 'post-id-1'
        }
      },
      users: {}
    })
  })

  it('should handle POSTS_SUCCESS and parse posts data to posts entities', () => {
    const { entities } = reducer(undefined, {
      type: types.POSTS_SUCCESS,
      data: [{
        type: 'posts',
        id: 'post-id-1'
      }, {
        type: 'posts',
        id: 'post-id-2'
      }]
    })
    
    expect(entities).to.deep.equal({
      posts: {
        'post-id-1': { 
          type: 'posts',
          id: 'post-id-1'
        },
        'post-id-2': { 
          type: 'posts',
          id: 'post-id-2'
        }
      },
      users: {}
    })
  })
})