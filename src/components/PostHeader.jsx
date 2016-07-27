import moment from 'moment'
import React from 'react'
import { Link } from 'react-router'

const PostHeader = ({ data, onClickTitle }) => {
  const publishedAt = moment(data.attributes.publishedAt)
  const permalink = [
    '',
    publishedAt.format('YYYY/MM/DD'),
    data.attributes.slug
  ].join('/')

  return (
    <header className="header">
      <h1 className="title">
        <Link to={ permalink } onClick={ onClickTitle }>{ data.attributes.title }</Link>
      </h1>
      <div className="metadata">
        Posted on { publishedAt.fromNow() }&nbsp;&middot;&nbsp;<Link to={ `${permalink}#disqus_thread` }>Comments</Link>
      </div>
    </header>
  )
}

export default PostHeader
