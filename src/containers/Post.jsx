import React from 'react'
import { asyncConnect } from 'redux-connect'

import { PostHeader, PostFooter } from './'
import { fetchPost } from '../actions/PostsActions'

export const Post = ({ data, entities }) => {
  return (
    <div className="single post-item">
      <PostHeader data={ entities.posts[data.id] } />
    </div>
  )
}

export default asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (getState().post.data &&
        getState().entities.posts[getState().post.data]) {
      return Promise.resolve()
    }

    return dispatch(fetchPost(getState().post.slug))
  }
}], (state) => ({
  ...state.post,
  entities: state.entities
}))(Post)