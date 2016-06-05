import types from '../constants/actionTypes'

export default (state, action) => {
  switch(action.type) {
    case types.ON_CLICK_MENU_BUTTON:
      return Object.assign({}, state, {
        isExpanded: action.isExpanded
      })
  }
}