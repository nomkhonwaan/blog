import React from 'react'
import { asyncConnect } from 'redux-connect'
import classNames from 'classnames'

import { 
  Loading, 
  NotFound, 
  Pagination, 
  Summary 
} from '../components'
import { fetchPosts } from '../actions/PostsActions'

export const Posts = ({ 
  data,
  entities,
  isFetching,
  itemsPerPage,
  links,
  meta: { totalItems },
  page,
}) => {
  return (
    <div className="posts">
      {
        (isFetching
          ? <Loading />
          : (data[page]
              ? data[page]. 
                  map((item) => {
                    return entities.posts[item]
                  }). 
                  map((item, key) => {
                    return (
                      <Summary data={ item } key={ key } />
                    )
                  })
              : <NotFound />))
      }
      
      <Pagination 
        itemsPerPage={ itemsPerPage }
        links={ links }
        page={ page }
        totalItems={ totalItems } />
    </div>
  )
}

export default asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (getState().posts.data[getState().posts.page]) {
      return Promise.resolve()
    }

    return dispatch(fetchPosts(
      getState().posts.page,
      getState().posts.itemsPerPage
    ))
  }
}], (state) => ({
  ...state.posts,
  entities: state.entities
}))(Posts)