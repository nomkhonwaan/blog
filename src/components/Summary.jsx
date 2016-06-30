import moment from 'moment'
import React from 'react'
import { AllHtmlEntities as Entities } from 'html-entities'
import { Link } from 'react-router'

const Summary = ({ data }) => {
  const entities = new Entities()
  const publishedAt = moment(data.attributes.publishedAt)
  const permalink = [ 
    '', 
    publishedAt.format('YYYY/MM/DD'),
    data.attributes.slug
  ].join('/')

  return (
    <div className="summary">
      <header className="header">
        <h1 className="title">
          <Link to={ permalink }>{ data.attributes.title }</Link>
        </h1>
        <div className="metadata">
          Posted on { publishedAt.fromNow() }&nbsp;&middot;&nbsp;<Link to={ `${permalink}#disqus_thread` }>Comments</Link>
        </div>
      </header>
      <article
        className="article"
        dangerouslySetInnerHTML={ {
          __html: entities. 
                  decode(data.attributes.html).
                  split('<!--more-->')[0]
        } }>
      </article>
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
    </div>
  )
}

export default Summary