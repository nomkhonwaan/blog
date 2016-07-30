import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

import { Disqus } from '../../../src/components/Disqus'

describe('components/Disqus.jsx', () => {
  it('should render `.comments` component correctly', () => {
    const wrapper = shallow(<Disqus />)
    
    expect(wrapper.find('.comments')).to.have.length(1)
    expect(wrapper.find('#disqus_thread')).to.have.length(1)
  })
})
