import types from '../constants/ActionTypes'

const initialState = {
  isExpanded: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.ON_CLICK_MENU_BUTTON: {
      return Object.assign({}, state, {
        isExpanded: action.isExpanded
      })
    }
    
    default: {
      return state
    }
  }
}