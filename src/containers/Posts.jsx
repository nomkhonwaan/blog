import React from 'react'
import { asyncConnect } from 'redux-connect'
import classNames from 'classnames'

import { fetchPosts } from '../actions/PostsActions'
import { Pagination, Summary } from '../components'

const Posts = ({ 
  data,
  entities,
  isFetching,
  itemsPerPage,
  links,
  meta: { totalItems },
  page,
}) => {
  return (
    <div>
      <div className="posts">
        {
          (isFetching || ! data[page]
            ? <div className="loading">
                <i className="fa fa-fw fa-spin fa-refresh"></i>
                <div>Loading...</div>
              </div>
            : data[page]. 
                map((item) => {
                  return entities.posts[item]
                }). 
                map((item, key) => {
                  return (
                    <Summary data={ item } key={ key } />
                  )
                }))
        }
      </div>
      
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