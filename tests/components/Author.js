import { expect } from 'chai'
import path from 'path'
import React from 'react'
import { shallow } from 'enzyme'
import 'ignore-styles'

import Author from '../../src/components/Author'

describe('components/Author.jsx', () => {
  it('should render an `.author` component correctly', () => {
    const wrapper = shallow(<Author />)
    
    expect(wrapper.find('.author')).to.have.length(1)
    expect(wrapper.find('.avatar')).to.have.length(1)
    expect(wrapper.find('.description').text()).to.equal('Trust me I\'m Petdo')
    expect(wrapper.find('.location').text()).to.equal('Bangkok, Thailand')
  })
})