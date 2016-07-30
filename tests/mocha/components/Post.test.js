import { expect } from 'chai'
import { mount } from 'enzyme'
import { AllHtmlEntities as Entities } from 'html-entities'
import React from 'react'

import { Post } from '../../../src/components/Post'

describe('components/Post.jsx', () => {
  it('should render `.post` component correctly', () => {
    const entities = new Entities()
    const data = {
      id: 'post-test',
      attributes: {
        html: entities.encode('<p>Post test</p>'),
        publishedAt: Date.now(),
        tags: [
          'post',
          'test'
        ]
      }
    }

    const wrapper = mount(<Post data={ data } />)

    expect(wrapper.find('.post')).to.have.length(1)
    expect(wrapper.find('article').text()).to.equal('Post test')
  })
})
