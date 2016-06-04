import { expect } from 'chai'
import types from '../../src/constants/actionTypes'
import { onClickMenuButton } from '../../src/actions/nav'

describe('actions/nav.js', () => {
  it('should toggle sidebar menu when click on menu button', () => {
    const isExpanded = false 
    
    expect(onClickMenuButton(isExpanded)).to.deep.equal(Object.assign({}, {
      type: types.ON_CLICK_MENU_BUTTON,
      isExpanded: ! isExpanded
    }))
  })
})