import { expect } from 'chai'

import types from '../../src/constants/ActionTypes'
import promiseMiddleware from '../../src/middlewares/PromiseMiddleware'

const createFakeStore = (fakeData) => ({
  getState() {
    return fakeData
  }
})

const dispatchWithStoreOf = (storeData, action) => {
  let dispatched = null 
  const dispatch = promiseMiddleware(createFakeStore(storeData))((actionAttempt) => {
    dispatched = actionAttempt
  })
  dispatch(action)
  return dispatched
}

describe('middlewares/PromiseMiddleware.js', () => {
  it('should not dispatch if action does not have "promise" property', () => {
    const action = {
      type: types.ON_CLICK_MENU_BUTTON
    }
    
    expect(dispatchWithStoreOf({}, action)).to.deep.equal(action)
  })
})

