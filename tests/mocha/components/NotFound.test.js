import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import { NotFound } from '../../../src/components/NotFound'

describe('components/NotFound.jsx', () => {
  it('should render `.error` component correctly', () => {
    const wrapper = shallow(<NotFound />)

    expect(wrapper.find('.error')).to.have.length(1)
  })
})
