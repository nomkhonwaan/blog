import { expect } from 'chai'

import types from '../../src/constants/ActionTypes'
import reducer from '../../src/reducers'

describe('reducers/index.js', () => {
  it('should handle POSTS_SUCCESS and parse posts data to posts entities', () => {
    expect(reducer(undefined, {
      type: types.POSTS_SUCCESS,
      data: [{
        id: 1,
        foo: 'bar'
      }, {
        id: 2,
        foo: 'bar'
      }]
    })).to.deep.equal({
      nav: { 
        isExpanded: false 
      },
      posts: { 
        page: 1,
        itemsPerPage: 5,
        isFetching: false,
        lastUpdated: undefined,
        data: [ 1, 2 ],
        meta: undefined,
        links: undefined,
        included: undefined 
      },
      entities: {
        posts: {
          1: {
            id: 1,
            foo: 'bar'
          },
          2: {
            id: 2,
            foo: 'bar'
          }
        },
        users: {}
      }
    })
  })
})