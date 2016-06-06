import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'

import types from '../../src/constants/ActionTypes'
import PromiseMiddleware from '../../src/middlewares/PromiseMiddleware'

const middlewares = [ PromiseMiddleware ]
const mockStore = configureMockStore(middlewares)

describe('middlewares/PromiseMiddleware.js', () => {
  it('should not dispatch if action does not have "promise" property', () => {
    const action = {
      type: types.ON_CLICK_MENU_BUTTON
    }
    
    const store = mockStore({})
    
    expect(store.dispatch(action)).to.deep.equal(action)
  })
  
  it('should dispatch request state while calling promise action and return success state', () => {
    const action = {
      types: [ 
        types.POSTS_REQUEST, 
        types.POSTS_SUCCESS,
        types.POSTS_FAILURE
      ],
      promise: Promise.resolve({
        body: {
          foo: 'bar'
        }
      })
    }
    
    const store = mockStore({})
    
    const expectedActions = [
      { type: types.POSTS_REQUEST },
      { type: types.POSTS_SUCCESS, foo: 'bar' }
    ]
    
    store.dispatch(action). 
      then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
  
  it('should dispatch request state while calling promise action and return failure state, errors response acquired', () => {
    const action = {
      types: [
        types.POSTS_REQUEST,
        types.POSTS_SUCCESS,
        types.POSTS_FAILURE
      ],
      promise: Promise.resolve({
        errors: [{
          foo: 'bar'
        }]
      })
    }
    
    const store = mockStore({})
    
    const expectedActions = [
      { type: types.POSTS_REQUEST },
      { type: types.POSTS_FAILURE, foo: 'bar' }
    ]
    
    store.dispatch(action). 
      then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
  
  it('should dispatch request state while calling promise action and return failure state, an error has occurred', () => {
    const action = {
      types: [
        types.POSTS_REQUEST,
        types.POSTS_SUCCESS,
        types.POSTS_FAILURE
      ],
      promise: Promise.reject({
        errors: [{
          foo: 'bar'
        }]
      })
    }
    
    const store = mockStore({})
    
    const expectedActions = [
      { type: types.POSTS_REQUEST },
      { type: types.POSTS_FAILURE, foo: 'bar' }
    ]
    
    store.dispatch(action). 
      then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
})

