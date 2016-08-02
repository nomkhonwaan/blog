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
            ? <Link
                className="button--clean"
                to={ [
                  '',
                  'pages',
                  page - 1
                ].join('/') }>
                  <i className="fa fa-fw fa-angle-double-left"></i> Newer 
                </Link>
            : null
        }
      </div>
      <div className="counter">
        Page { page } of { Math.ceil(totalItems / itemsPerPage) }
      </div>
      <div className="next">
        {
          links.next
            ? <Link
                className="button--clean"
                to={ [
                  '',
                  'pages',
                  page + 1
                ].join('/') }>
                  Older <i className="fa fa-fw fa-angle-double-right"></i> 
              </Link>
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
