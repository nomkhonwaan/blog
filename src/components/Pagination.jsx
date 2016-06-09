import React from 'react'
import { Link } from 'react-router'

const Pagination = ({ itemsPerPage, links, page, totalItems }) => {
  const styles = require('../stylesheets/Pagination.scss')
  
  return (
    <div className={ styles.pagination }>
      <div className={ styles.previous }>
        {
          links.previous
            ? <Link to={ [
              '',
              'pages',
              page - 1
            ].join('/') }>&laqou; Newer</Link>
            : null
        }
      </div>
      <div className={ styles.counter }>
        Page { page } of { Math.ceil(totalItems / itemsPerPage) }
      </div>
      <div className={ styles.next }>
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

export default Pagination