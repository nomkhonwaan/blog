import moment from 'moment'
import React from 'react'
import { Link } from 'react-router'

const Summary = ({ data }) => {
  const styles = Object.assign({},
    require('../stylesheets/Summary.scss'))
  const publishedAt = moment(data.attributes.publishedAt)
  const permalink = [ 
    '', 
    publishedAt.format('YYYY/MM/DD'),
    data.attributes.slug
  ].join('/')

  return (
    <div className={ styles.summary }>
      <header className={ styles.header }>
        <h1 className={ styles.title }>
          <Link to={ permalink }>{ data.attributes.title }</Link>
        </h1>
        <div className={ styles.metadata }>
          Posted on { publishedAt.fromNow() }&nbsp;&middot;&nbsp;<Link to={ `${permalink}#disqus_thread` }>Comments</Link>
        </div>
      </header>
      <article
        className={ styles.article }
        dangerouslySetInnerHTML={ {
          __html: data.
            attributes.
            html. 
            split('<!--more-->')[0]
        } }>
      </article>
      <footer className={ styles.footer }>
        <ul className={ styles['tag-list'] }>
          {
            data.attributes.tags. 
              map((item, key) => {
                return (
                  <li 
                    key={ key }
                    className={ styles['tag-item'] }>
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