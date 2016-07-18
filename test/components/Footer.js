import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import { Footer } from '../../src/components/Footer'

describe('components/Footer.jsx', () => {
  it('should render `.layout-footer` component correctly', () => {
    const wrapper = shallow(<Footer />)

    expect(wrapper.find('.layout-footer')).to.have.length(1)
    expect(wrapper.find('.layout-footer').text()).to.match(new RegExp(`${new Date().getFullYear()}`));
  })
})