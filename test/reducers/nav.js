import { expect } from 'chai'

import types from '../../src/constants/ActionTypes'
import reducer, { initialState } from '../../src/reducers/nav'

describe('reducers/nav.js', () => {
  it('should handle ON_CLICK_MENU_BUTTON by toggle isExpanded to "true"', () => {
    expect(reducer(undefined, {
      type: types.ON_CLICK_MENU_BUTTON,
      isExpanded: true
    })).to.deep.equal(Object.assign({}, initialState, {
      isExpanded: true
    }))
  })
  
  it('should handle ON_CLICK_MENU_BUTTON by toggle isExpanded to "false"', () => {
    expect(reducer(undefined, {
      type: types.ON_CLICK_MENU_BUTTON,
      isExpanded: false
    })).to.deep.equal(Object.assign({}, initialState, {
      isExpanded: false
    }))
  })
})