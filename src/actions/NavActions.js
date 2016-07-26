import types from '../constants/ActionTypes'

export const toggleMenuButton = function (isExpanded = false) {
  return {
    type: types.NAV_TOGGLE_MENU_BUTTON,
    isExpanded: ! isExpanded
  }
}
