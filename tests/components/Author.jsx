import { expect } from 'chai'
import React from 'react'
import jsdom from 'mocha-jsdom'
import TestUtils from 'react-addons-test-utils'
import path from 'path'

import { Author } from '../../src/components'

describe('components/Author.js', () => {
  jsdom()
  
  it('should render correctly', () => {
    const output = TestUtils.renderIntoDocument(<Author />)
    console.log(output);
  })
})