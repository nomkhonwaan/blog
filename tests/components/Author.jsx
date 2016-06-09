import { expect } from 'chai'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

import Author from '../../src/components/Author'

describe('components/Author.jsx', () => {
  it('should render correctly', () => {
    TestUtils.renderToDocument(<Author />)
  })
})