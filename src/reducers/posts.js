import types from '../constants/ActionTypes'

export const initialState = {
  data: {},
  itemsPerPage: 5,
  isFetching: false,
  isPopup: false,
  lastUpdated: NaN,
  page: 1,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.POSTS_PAGE_CHANGE: {
      return Object.assign({}, state, {
        page: action.page
      })
    }

    case types.POSTS_PAGE_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true
      })
    }

    case types.POSTS_PAGE_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: action.receivedAt,
        meta: action.meta,
        links: action.links,
        data: {
          ...state.data,
          [state.page]: action.
            data.
            map((item) => {
              return item.attributes.slug
            })
        },
        included: action.included
      })
    }

    case types.POSTS_PAGE_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: action.receivedAt,
        errors: action.errors
      })
    }

    case types.POSTS_TOGGLE_POPUP_POST: {
      return Object.assign({}, state, {
        isPopup: action.isPopup
      })
    }

    default: {
      return state
    }
  }
}
