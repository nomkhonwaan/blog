import { expect } from 'chai'
import { mount } from 'enzyme'
import React from 'react'

import Pagination from '../../src/components/Pagination'

describe('component/Pagination', () => {
  it('should render `.pagination` only next button and show page 1 of 3 pages', () => {
    const wrapper = mount(<Pagination
      itemsPerPage={ 5 }
      links={ {
        self: 'testSelfUrl',
        next: 'testNextUrl'
      } }
      page={ 1 }
      totalItems={ 11 } />)

    expect(wrapper.find('.pagination')).to.have.length(1)
    expect(wrapper.find('.previous').text()).to.equal('')
    expect(wrapper.find('.next').text()).to.equal('Older »')
    expect(wrapper.find('.counter').text()).to.equal('Page 1 of 3')
  })

  it('should return `.pagination` only previous button and show page 3 of 3 pages', () => {
    const wrapper = mount(<Pagination
      itemsPerPage={ 5 }
      links={ {
        self: 'testSelfUrl',
        previous: 'testPreviousUrl'
      } } 
      page={ 3 }
      totalItems={ 11 } />)
    
    expect(wrapper.find('.pagination')).to.have.length(1)
    expect(wrapper.find('.previous').text()).to.equal('« Newer')
    expect(wrapper.find('.next').text()).to.equal('')
    expect(wrapper.find('.counter').text()).to.equal('Page 3 of 3')
  })

  it('should return `.pagination` both of previous and next button and show page 2 of 3 pages', () => {
    const wrapper = mount(<Pagination 
      itemsPerPage={ 5 }
      links={ {
        self: 'testSelfUrl',
        next: 'testNextUrl',
        previous: 'testPreviousUr'
      } } 
      page={ 2 }
      totalItems={ 11} />)
    
    expect(wrapper.find('.pagination')).to.have.length(1)
    expect(wrapper.find('.previous').text()).to.equal('« Newer')
    expect(wrapper.find('.next').text()).to.equal('Older »')
    expect(wrapper.find('.counter').text()).to.equal('Page 2 of 3')
  })
})