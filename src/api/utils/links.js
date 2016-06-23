import url from 'url'

export default (page, itemsPerPage, totalItems, baseUrl = '/') => {
  const links = {}
  const baseUrlObject = url.parse(baseUrl, true)

  if ( ! baseUrlObject.query['page[number]']) {
    baseUrlObject.query['page[number]'] = page
  }

  if ( ! baseUrlObject.query['page[size]']) {
    baseUrlObject.query['page[size]'] = itemsPerPage
  }

  const selfObject = Object.assign({}, baseUrlObject, {
    query: {
      ...baseUrlObject.query,
      ['page[number]']: page
    }
  })
  delete selfObject.search
  links.self = decodeURI(url.format(selfObject))

  if (totalItems > itemsPerPage) {
    if (page < Math.ceil(totalItems / itemsPerPage)) {
      const nextObject = Object.assign({}, baseUrlObject, {
        query: {
          ...baseUrlObject.query,
          ['page[number]']: page + 1
        }
      })
      delete nextObject.search
      links.next = decodeURI(url.format(nextObject))
    }

    if (page > 1) {
      const previousObject = Object.assign({}, baseUrlObject, {
        query: {
          ...baseUrlObject.query,
          ['page[number]']: page - 1
        }
      })
      delete previousObject.search
      links.previous = decodeURI(url.format(previousObject))
    }
  }

  return links
}
