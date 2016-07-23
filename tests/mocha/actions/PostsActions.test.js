import { expect } from 'chai'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'

import { 
  changePage, 
  fetchPost, 
  fetchPosts 
} from '../../../src/actions/PostsActions'
import types from '../../../src/constants/ActionTypes'
import PromiseMiddleware from '../../../src/middlewares/PromiseMiddleware'

const middlewares = [ PromiseMiddleware ]
const mockStore = configureMockStore(middlewares)

describe('actions/PostsActions.js', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('fetchPost :: only published post', () => {
    it('should create POSTS_POST_SUCCESS when fetching post has been done', () => {
      nock(/.*/). 
        get('/api/v1/posts/test-post'). 
        reply(200, {
          body: {
            links: {
              self: '/api/v1/posts/test-post'
            }
          }
        })

      const store = mockStore()

      const expectedActions = [
        { type: types.POSTS_POST_SUCCESS },
        { type: types.POSTS_POST_SUCCESS, links: { self: '/api/v1/posts/test-post' } }, 
      ]

      store.dispatch(fetchPost('test-post')). 
        then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })

    it('should create POSTS_POST_FAILURE when fetching post has been done, but errors', () => {
      nock(/.*/). 
        get('/api/v1/posts/test-post'). 
        reply(400, {
          body: {
            errors: [{
              status: 400,
              title: 'An error has occurred', 
              detail: 'Something went wrong'
            }]
          }
        })
      
      const store = mockStore()

      const expectedActions = [
        { type: types.POSTS_PAGE_REQUEST },
        { type: types.POSTS_PAGE_FAILURE, errors: [{
          status: 400,
          title: 'An error has occurred',
          detail: 'Something went wrong'
        }] }
      ]
      
      store.dispatch(fetchPost()). 
        then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })

  describe('fetchPosts :: only published posts', () => {
    it('should create POSTS_PAGE_CHANGE when changing posts page', () => {
      const page = 1 

      expect(changePage(page)).to.deep.equal({
        type: types.POSTS_PAGE_CHANGE,
        page
      })
      expect(changePage(page + 1)).to.deep.equal({
        type: types.POSTS_PAGE_CHANGE,
        page: page + 1
      })
      expect(changePage(page - 1)).to.deep.equal({
        type: types.POSTS_PAGE_CHANGE,
        page: page - 1
      })
    })
  
    it('should create POSTS_PAGE_SUCCESS when fetching posts has been done', () => {
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
        { type: types.POSTS_PAGE_REQUEST },
        { type: types.POSTS_PAGE_SUCCESS, meta: { totalItems: 1 } }
      ]
      
      store.dispatch(fetchPosts()). 
        then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
    
    it('should create POSTS_PAGE_FAILURE when fetching posts has been done, but errors', () => {
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
        { type: types.POSTS_PAGE_REQUEST },
        { type: types.POSTS_PAGE_FAILURE, errors: [{
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
})