import React from 'react'
import classNames from 'classnames'
import { asyncConnect } from 'redux-connect'
import Helmet from 'react-helmet'

import { Single } from './'
import {
  Loading,
  NotFound,
  Pagination,
  Post,
  Summary
} from '../components'
import { changePost, fetchPosts } from '../actions/PostsActions'

export const Posts = ({
  data,
  entities,
  isFetching,
  isPopup,
  itemsPerPage,
  links,
  meta: { totalItems },
  page
}) => {
  return (
    <div>
      <Helmet
        title={ (page === 1
          ? 'Nomkhonwaan'
          : `Page ${page}`) } />
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
