import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import { Loading } from '../../../src/components/Loading'

describe('components/Loading.jsx', () => {
  it('should render `.loading` component correctly', () => {
    const wrapper = shallow(<Loading />)

    expect(wrapper.find('.loading')).to.have.length(1)
    expect(wrapper.find('.spinner')).to.have.length(1)
    expect(wrapper.find('.bounce1')).to.have.length(1)
    expect(wrapper.find('.bounce2')).to.have.length(1)
    expect(wrapper.find('.bounce3')).to.have.length(1)
  })
})
