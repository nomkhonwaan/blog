import React, { Component } from 'react'
import { AllHtmlEntities as Entities } from 'html-entities'
import { asyncConnect } from 'redux-connect'

import { 
  Loading, 
  NotFound,
  PostHeader, 
  PostFooter 
} from '../components'
import { fetchPost } from '../actions/PostsActions'

export class Single extends Component {
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
    const {
      slug,
      entities: { posts },
      isFetching
    } = this.props
    const data = posts[slug]
    const entities = new Entities()

    return (
      <div className="single">
        {
          (isFetching
            ? <Loading />
            : (data
              ? <div className="post">
                  <PostHeader data={ data } />
                  <article
                    className="article"
                    dangerouslySetInnerHTML={ {
                      __html: entities. 
                              decode(data.attributes.html)
                    } }>
                  </article>
                  <PostFooter data={ data } /> 
                </div>
              : <NotFound />))
        }
      </div>
    )
  }
}

export default asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (getState().post.slug && 
        getState().entities.posts[getState().post.slug]) {
      return Promise.resolve()
    }

    return dispatch(fetchPost(getState().post.slug))
  }
}], (state) => ({
  ...state.post,
  entities: state.entities
}))(Single)