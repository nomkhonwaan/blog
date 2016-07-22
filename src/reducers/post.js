import types from '../constants/ActionTypes'

export const initialState = {
  isFetching: false,
  lastUpdated: NaN,
  data: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.POST_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true
      })
    }

    case types.POST_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: action.receivedAt,
        links: action.links,
        data: action.data.id,
        included: action.included
      })
    }

    case types.POST_FAILURE: {
      return Object.assign({}, state, {
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