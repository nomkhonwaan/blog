import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import configureMockStore from 'redux-mock-store'

import { Nav } from '../../../src/components/Nav'
import { initialState } from '../../../src/reducers/nav'

const mockStore = configureMockStore()
const store = mockStore(initialState)

describe('components/Nav.jsx', () => {
  beforeEach(() => {
    store.clearActions()
  })

  it('should render `.layout-nav` component correctly', () => {
    const wrapper = shallow(<Nav { ...store } { ...store.getState() } />)

    expect(wrapper.find('.layout-nav')).to.have.length(1)
    expect(wrapper.find('.menu-list')).to.have.length(1)
    expect(wrapper.find('.expanded')).to.have.length(0)
    expect(wrapper.find('.menu-item')).to.have.length(store.getState().menuItems.length)
    expect(wrapper.find('.btn-toggle')).to.have.length(1)
  })

  it('should render `.expanded` component when perform click on menu button', () => {
    const wrapper = shallow(<Nav
      { ...store }
      { ...store.getState() }
      isExpanded={ true }  />)

    expect(wrapper.find('.expanded')).to.have.length(1)
  })
})
