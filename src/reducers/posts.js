import types from '../constants/ActionTypes'

export const initialState = {
  page: 1,
  itemsPerPage: 5,
  isFetching: false,
  lastUpdated: NaN,
  data: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.POSTS_PAGE: {
      return Object.assign({}, state, {
        page: action.page
      })
    }

    case types.POSTS_REQUEST: {
      return Object.assign({}, state, {
        isFetching: true
      }) 
    }
    
    case types.POSTS_SUCCESS: {
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
              return item.id
            })
        },
        included: action.included
      })
    }
    
    case types.POSTS_FAILURE: {
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