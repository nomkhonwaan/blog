import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import configureMockStore from 'redux-mock-store'

import Nav from '../../src/components/Nav'

const mockStore = configureMockStore()
const store = mockStore({
  isExpanded: false
})

describe('components/Nav.jsx', () => {
  before(() => {

  })

  it('should render `.layout-nav` component correctly', () => {
    const wrapper = shallow(<Nav {...store} />)

    expect(wrapper.find('.layout-nav')).to.have.length(1)
  })
})