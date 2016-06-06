import { expect } from 'chai'

import { onClickMenuButton } from '../../src/actions/NavActions'
import types from '../../src/constants/ActionTypes'

describe('actions/NavActions.js', () => {
  it('should create ON_CLICK_MENU_BUTTON when click the menu button', () => {
    const isExpanded = false 
    
    expect(onClickMenuButton(isExpanded)).to.deep.equal({
      type: types.ON_CLICK_MENU_BUTTON,
      isExpanded: ! isExpanded
    })
  })
  
  it('should create ON_CLICK_MENU_BUTTON when click the menu button, again', () => {
    const isExpanded = true 
    
    expect(onClickMenuButton(isExpanded)).to.deep.equal({
      type: types.ON_CLICK_MENU_BUTTON,
      isExpanded: ! isExpanded
    })
  })
})