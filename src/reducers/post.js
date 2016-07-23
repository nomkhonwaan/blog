import types from '../constants/ActionTypes'

export const initialState = {
  year:        null,
  month:       null,
  date:        null,
  slug:        null,
  isFetching:  false,
  lastUpdated: NaN,
  data:        {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.POSTS_POST_CHANGE: {
      return Object.assign({}, state, {
        slug: action.slug
      })
    }

    case types.POSTS_POST_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true
      })
    }

    case types.POSTS_POST_SUCCESS: {
      return Object.assign({}, state, {
        slug: action.data.attributes.slug,
        isFetching: false,
        lastUpdated: action.receivedAt,
        links: action.links,
        included: action.included
      })
    }

    case types.POSTS_POST_FAILURE: {
      return Object.assign({}, state, {
        slug: null,
        isFetching: false,
        lastUpdated: action.receivedAt,
        errors: action.errors
      })
    }

    default: {
      return state
    }
  }
}