import types from '../constants/ActionTypes'

export const onClickMenuButton = function (isExpanded = false) {
  return {
    type: types.ON_CLICK_MENU_BUTTON,
    isExpanded: ! isExpanded
  }
}