import { expect } from 'chai'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'

import { fetchPosts } from '../../src/actions/PostsActions'
import types from '../../src/constants/ActionTypes'
import PromiseMiddleware from '../../src/middlewares/PromiseMiddleware'

const middlewares = [ PromiseMiddleware ]
const mockStore = configureMockStore(middlewares)

describe('actions/PostsActions.js', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  
  it('should create POSTS_SUCCESS when fetching posts has been done', () => {
    nock(/.*/). 
      get('/api/v1/posts'). 
      query(({ page }) => {
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
    
    store.dispatch(fetchPosts()). 
      then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
  
  it('should create POSTS_FAILURE when fetching posts has been done, but errors', () => {
    nock(/.*/). 
      get('/api/v1/posts'). 
      query(({ page }) => {
        return parseInt(page.number) === 1 &&
               parseInt(page.size) === 5 
      }). 
      reply(400, { 
        body: {
          errors: [{
            status: 400,
            title: 'An error has occurred',
            detail: 'Something went wrong'
          }]
        }
      })
      
    const store = mockStore({
      page: 1,
      itemsPerPage: 5
    })
    
    const expectedActions = [
      { type: types.POSTS_REQUEST },
      { type: types.POSTS_FAILURE, errors: [{
        status: 400,
        title: 'An error has occurred',
        detail: 'Something went wrong'
      }] }
    ]
    
    store.dispatch(fetchPosts()). 
      then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
})