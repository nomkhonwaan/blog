import { expect } from 'chai'

import types from '../../src/constants/ActionTypes'
import { onClickMenuButton } from '../../src/actions/nav'

describe('actions/nav.js', () => {
  it('should toggle state "true" when click on menu button', () => {
    const isExpanded = false 
    
    expect(onClickMenuButton(isExpanded)).to.deep.equal({
      type: types.ON_CLICK_MENU_BUTTON,
      isExpanded: ! isExpanded
    })
  })
  
  it('should toggle state "false" when click on menu button', () => {
    const isExpanded = true 
    
    expect(onClickMenuButton(isExpanded)).to.deep.equal({
      type: types.ON_CLICK_MENU_BUTTON,
      isExpanded: ! isExpanded
    })
  })
})