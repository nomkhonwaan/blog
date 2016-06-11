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
  page,
  totalItems
}) => {
  const styles = Object.assign({}, 
    require('../stylesheets/Posts.scss'),
    require('font-awesome/css/font-awesome.css'))
    
  return (
    <div>
      <div className={ styles.posts }>
        {
          (isFetching
            ? <div className={ styles.loading }>
                <i className={ classNames(
                  styles.fa,
                  styles['fa-fw'],
                  styles['fa-spin'],
                  styles['fa-refresh']
                ) }></i>
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
    const page = getState().posts.page 
    const data = getState().posts.data

    if (data[page]) {
      return Promise.resolve()
    }

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