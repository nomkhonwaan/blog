import React, { Component } from 'react'
import { AllHtmlEntities as Entities } from 'html-entities'

import {
  Disqus,
  PostHeader,
  PostFooter
} from './'

export class Post extends Component {
  componentDidMount() {
    if (typeof hljs !== 'undefined') {
      const codeElements = document.getElementsByTagName('pre')

      Object.
        keys(codeElements).
        map((item) => {
          hljs.highlightBlock(codeElements[item])
        })
    }
  }

  render() {
    const { data } = this.props
    const entities = new Entities()

    return (
      <div className="post">
        <PostHeader data={ data } />
        <article
          className="article"
          dangerouslySetInnerHTML={ {
            __html: entities.
                      decode(data.attributes.html)
          } }>
        </article>
        <Disqus />
        <PostFooter data={ data } />
      </div>
    )
  }
}

export default Post
