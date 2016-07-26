import React from 'react'
import { connect } from 'react-redux'
import { AllHtmlEntities as Entities } from 'html-entities'

import { PostHeader, PostFooter } from './'

const Summary = ({
  data,
  onClickTitle
}) => {
  const entities = new Entities()

  return (
    <div className="summary">
      <div className="post">
        <PostHeader
          data={ data }
          onClickTitle={ onClickTitle } />
        <article
          className="article"
          dangerouslySetInnerHTML={ {
            __html: entities.
                    decode(data.attributes.html).
                    split('<!--more-->')[0]
          } }>
        </article>
        <PostFooter data={data} />
      </div>
    </div>
  )
}

export default Summary
