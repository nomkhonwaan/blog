import { expect } from 'chai'
import { mount } from 'enzyme'
import React from 'react'
import configureMockStore from 'redux-mock-store'

import { Single } from '../../../src/containers/Single'
import { initialState } from '../../../src/reducers/post'

const mockStore = configureMockStore()
const store = mockStore(initialState)

describe('containers/Single.jsx', () => {
  it('should render `.single` container correctly', () => {
  })
})
