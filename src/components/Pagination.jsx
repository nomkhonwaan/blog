import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Pagination = ({ 
  itemsPerPage, 
  links, 
  page, 
  totalItems
 }) => {
  return (
    <div className="pagination">
      <div className="previous">
        {
          links.previous
            ? <Link to={ [
              '',
              'pages',
              page - 1
            ].join('/') }>&laquo; Newer</Link>
            : null
        }
      </div>
      <div className="counter">
        Page { page } of { Math.ceil(totalItems / itemsPerPage) }
      </div>
      <div className="next">
        {
          links.next
            ? <Link to={ [
              '',
              'pages',
              page + 1
            ].join('/') }>Older &raquo;</Link>
            : null
        }
      </div>
    </div>    
  )
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  links: PropTypes.shape({
    previous: PropTypes.string,
    self: PropTypes.string.isRequired,
    next: PropTypes.string
  }).isRequired,
  page: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired
}

export default Pagination