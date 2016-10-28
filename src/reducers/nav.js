import types from '../constants/ActionTypes'

export const initialState = {
  isExpanded: false,
  menuItems: [{
    title: 'Home',
    href: '//www.nomkhonwaan.com',
    iconClass: 'fa fa-fw fa-home'
  }, {
    title: 'Medium',
    href: 'https://medium.com/@nomkhonwaan',
    iconClass: 'fa fa-fw fa-medium'
  }, {
    title: 'GitHub',
    href: '//github.com/nomkhonwaan',
    iconClass: 'fa fa-fw fa-github'
  }, {
    title: 'Twitter',
    href: '//twitter.com/nomkhonwaan',
    iconClass: 'fa fa-fw fa-twitter'
  }, {
    title: 'LinkedIn',
    href: '//linkedin.com/in/nomkhonwaan',
    iconClass: 'fa fa-fw fa-linkedin'
  }, {
    title: 'RSS',
    href: '//www.nomkhonwaan.com/rss',
    iconClass: 'fa fa-fw fa-rss'
  }]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.NAV_TOGGLE_MENU_BUTTON: {
      return Object.assign({}, state, {
        isExpanded: action.isExpanded
      })
    }

    default: {
      return state
    }
  }
}
