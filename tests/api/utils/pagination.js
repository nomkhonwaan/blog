import { expect } from 'chai'
import pagination from '../../../src/api/utils/pagination'

describe('api/utils/pagination.js', () => {
  it('should create only self link', () => {
    const page = 1
    const itemsPerPage = 5
    const totalItems = 1

    const { self, next, previous } = pagination(page, itemsPerPage, totalItems,
      `/api/v1/posts`)

    expect(self).to.match(/(?=.*page\[number\]\=1)(?=.*page\[size\]\=5).*$/)
    expect(next).to.be.undefined
    expect(previous).to.be.undefined
  })
  
  it('should create only self and next links', () => {
    const page = 1
    const itemsPerPage = 5
    const totalItems = 10
    
    const { self, next, previous } = pagination(page, itemsPerPage, totalItems, 
      `/api/v1/posts`)
    
    expect(self).to.match(/(?=.*page\[number\]\=1)(?=.*page\[size\]\=5).*$/)
    expect(next).to.match(/(?=.*page\[number\]\=2)(?=.*page\[size\]\=5).*$/)
    expect(previous).to.be.undefined
  })
  
  it('should create only self and previous links', () => {
    const page = 3
    const itemsPerPage = 5
    const totalItems = 11
    
    const { self, next, previous } = pagination(page, itemsPerPage, totalItems,
      `/api/v1/posts?page[number]=${page}`)
    
    expect(self).to.match(/(?=.*page\[number\]\=3)(?=.*page\[size\]\=5).*$/)
    expect(next).to.be.undefined
    expect(previous).to.match(/(?=.*page\[number\]\=2)(?=.*page\[size\]\=5).*$/)
  })
  
  it('should create self, next and previous links', () => {
    const page = 2 
    const itemsPerPage = 5
    const totalItems = 15
    
    const { self, next, previous } = pagination(page, itemsPerPage, totalItems,
      `/api/v1/posts?page[number]=${page}`)
      
    expect(self).to.match(/(?=.*page\[number\]\=2)(?=.*page\[size\]\=5).*$/)
    expect(next).to.match(/(?=.*page\[number\]\=3)(?=.*page\[size\]\=5).*$/)
    expect(previous).to.match(/(?=.*page\[number\]\=1)(?=.*page\[size\]\=5).*$/)
  })
})
