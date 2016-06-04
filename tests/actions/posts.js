import { expect } from 'chai'
import nock from 'nock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import { fetchPosts } from '../../src/actions/posts'
import types from '../../src/constants/actionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions/posts.js', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  
  it('should create POSTS_SUCCESS when fetching posts has been done', () => {
    nock(/.*/). 
      get('/api/v1/posts'). 
      query((actualQueryObject) => {
        const { page } = actualQueryObject 
        
        return parseInt(page.number) === 1 &&
               parseInt(page.size) === 5 
      }). 
      reply(200, {
        body: {
          meta: {
            totalItems: 1
          }
        }
      })
    
    const store = mockStore({
      page: 1,
      itemsPerPage: 5
    })
    
    const expectedActions = [
      { type: types.POSTS_REQUEST },
      { type: types.POSTS_SUCCESS, meta: { totalItems: 1 } }
    ]
    
    store.dispatch(fetchPosts())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
})