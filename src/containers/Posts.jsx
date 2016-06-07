import React from 'react'
import { asyncConnect } from 'redux-connect'

import { fetchPosts } from '../actions/PostsActions'

const Posts = ({ 
  data,
  isFetching,
  entities
}) => {
  return (
    <div></div>
  )
}

export default asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    return dispatch(fetchPosts(
      getState().posts.page,
      getState().posts.itemsPerPage
    ))
  }
}], (state, ownProps) => {
  return {
    ...state.posts,
    entities: state.entities
  }
})(Posts)