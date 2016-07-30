import React, { Component } from 'react'
import { asyncConnect } from 'redux-connect'
import Helmet from 'react-helmet'

import {
  Loading,
  NotFound,
  Post
} from '../components'
import { fetchPost } from '../actions/PostsActions'

class Single extends Component {
  componentWillMount() {
    this.state = {
      isFetching: (typeof window !== 'undefined' && window.document
        ? true
        : this.props.isFetching)
    }
  }

  componentDidMount() {
    const { entities, slug } = this.props

    setTimeout(() => {
      if (entities.posts[slug]) {
        this.setState({ isFetching: false })
      }
    }, 500)
  }

  render() {
    const { entities, slug } = this.props
    let { isFetching } = this.state

    const data = entities.posts[slug]

    return (
        <div>
          <Helmet
            title={ data.attributes.title } />
          <div className="single">
            {
              (isFetching
                ? <Loading />
                : (data
                  ? <Post data={ data } />
                  : <NotFound />)
              )
            }
          </div>

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
