import { expect } from 'chai'

import types from '../../src/constants/ActionTypes'
import reducer from '../../src/reducers'

describe('reducers/index.js', () => {
  it('should handle POSTS_SUCCESS and parse posts data to posts entities', () => {
    const { entities } = reducer(undefined, {
      type: types.POSTS_SUCCESS,
      data: [{
        id: 1,
        foo: 'bar'
      }, {
        id: 2,
        foo: 'bar'
      }]
    })
    
    expect(entities).to.deep.equal({
      posts: {
        1: { id: 1, foo: 'bar' },
        2: { id: 2, foo: 'bar' }
      },
      users: {}
    })
  })
})