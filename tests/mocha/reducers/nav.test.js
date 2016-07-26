import { expect } from 'chai'

import types from '../../../src/constants/ActionTypes'
import reducer, { initialState } from '../../../src/reducers/nav'

describe('reducers/nav.js', () => {
  it('should handle `NAV_TOGGLE_MENU_BUTTON` by toggle `isExpanded`', () => {
    expect(reducer(undefined, {
      type: types.NAV_TOGGLE_MENU_BUTTON,
      isExpanded: true
    })).to.deep.equal(Object.assign({}, initialState, {
      isExpanded: true
    }))
    expect(reducer(undefined, {
      type: types.NAV_TOGGLE_MENU_BUTTON,
      isExpanded: false
    })).to.deep.equal(Object.assign({}, initialState, {
      isExpanded: false
    }))
  })
})
