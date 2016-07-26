import { expect } from 'chai'

import { toggleMenuButton } from '../../../src/actions/NavActions'
import types from '../../../src/constants/ActionTypes'

describe('actions/NavActions.js', () => {
  it('should create `NAV_TOGGLE_MENU_BUTTON` when click the menu button', () => {
    const isExpanded = false

    expect(toggleMenuButton(isExpanded)).to.deep.equal({
      type: types.NAV_TOGGLE_MENU_BUTTON,
      isExpanded: ! isExpanded
    })
    expect(toggleMenuButton( ! isExpanded)).to.deep.equal({
      type: types.NAV_TOGGLE_MENU_BUTTON,
      isExpanded
    })
  })
})
