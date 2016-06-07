import React from 'react'
import { asyncConnect } from 'redux-connect'

import { fetchPosts } from '../actions/PostsActions'

const Posts = ({ entities }) => {
  return (
    <div></div>
  )
}

export default asyncConnect([{
  key: 'posts',
  promise: ({ store: { dispatch, getState } }) => {
    return dispatch(fetchPosts(
      getState().posts.page,
      getState().posts.itemsPerPage
    ))
  }
}], (state, ownProps) => {
  return {
    entities: state.entities,
    ...state.posts
  }
})(Posts)