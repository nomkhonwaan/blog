import React from 'react'
import { Link } from 'react-router'

const PostFooter = ({ data }) => {
  return (
    <footer className="footer">
      <ul className="tag-list">
        {
          data.attributes.tags. 
            map((item, key) => {
              return (
                <li 
                  key={ key }
                  className="tag-item">
                  <Link to={ [
                    '',
                    'tags',
                    item.slug
                  ].join('/') }>
                    { item.name }
                  </Link>
                </li>
              )
            })
        }
      </ul>
    </footer>
  )
}

export default PostFooter