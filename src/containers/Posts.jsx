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
import { changePost, fetchPosts, togglePopupPost } from '../actions/PostsActions'

export const Posts = ({
  data,
  dispatch,
  entities,
  history,
  isFetching,
  isPopup,
  itemsPerPage,
  links,
  meta: { totalItems },
  page,
  slug
}) => {
  return (
    <div>
      <Helmet
        title={ `Page ${page}` } />
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
                        <Summary
                          data={ item }
                          key={ key }
                          onClickTitle={ (e) => {
                            e.preventDefault()
                            dispatch(togglePopupPost(isPopup))
                            dispatch(changePost(item.attributes.slug))
                          } } />
                      )
                    })
                : <NotFound />))
        }

        <div className={ classNames(
            'animation',
            'popup-post', {
              'zoom-in': (isPopup !== undefined && isPopup),
              'zoom-out': (isPopup !== undefined && ! isPopup)
            }
          ) }>
          <button
              className="close"
              onClick={ () => {
                dispatch(togglePopupPost(isPopup))
              } }>
            <i className="fa fa-fw fa-close"></i>
          </button>
          {
            (isPopup
              ? <div className="wrapper">
                  <Helmet
                    title={ entities.posts[slug].attributes.title } />
                  <Post data={ entities.posts[slug] } />
                </div>
              : null)
          }
        </div>

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
  ...state.post,
  ...state.posts,
  entities: state.entities
}))(Posts)
