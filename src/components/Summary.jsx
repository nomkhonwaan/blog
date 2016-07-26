import React from 'react'
import { connect } from 'react-redux'
import { AllHtmlEntities as Entities } from 'html-entities'

import { PostHeader, PostFooter } from './'
import { Single } from '../containers'
import { changePost } from '../actions/PostsActions'

const Summary = ({ dispatch, data }) => {
  const entities = new Entities()

  return (
    <div className="summary">
      <div className="post">
        <PostHeader
          data={data}
          onClickTitle={ () => {
            dispatch(changePost(data.attributes.slug))
          } } />
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

export default connect()(Summary)
