import React from 'react'
import { asyncConnect } from 'redux-connect'

import { 
  Loading, 
  PostHeader, 
  PostFooter 
} from '../components'
import { fetchPost } from '../actions/PostsActions'

export const Single = ({ 
  data, 
  entities,
  isFetching
}) => {
  return (
    <div className="single">
      {
        (isFetching
          ? <Loading />
          : <div className="post">
              <PostHeader data={ entities.posts[data.id] } />
              <PostFooter data={ entities.posts[data.id] } /> 
            </div>)
      }
    </div>
  )
}

export default asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {

    // if (getState().post.slug && 
    //     )
    // if (getState().post.slug &&
    //     getState().entities.posts[getState().post.data.id]) {
    //   return Promise.resolve()
    // }

    // return dispatch(fetchPost(getState().post.slug))
  }
}], (state) => ({
  ...state.post,
  entities: state.entities
}))(Single)