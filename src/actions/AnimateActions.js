import types from '../constants/ActionTypes'

export const moveLeft = function () {
  return {
    types: [
      types.ANIMATE_BEFORE,
      types.ANIMATE_MOVE_LEFT,
      types.ANIMATE_FINISH
    ]
  }
}

export const moveRight = function () {
  return {
    types: [
      types.ANIMATE_BEFORE,
      types.ANIMATE_MOVE_RIGHT,
      types.ANIMATE_FINISH
    ]
  }
}
