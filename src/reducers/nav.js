import types from '../constants/ActionTypes'

export const initialState = {
  isExpanded: false,
  menuItems: [{
    title: 'Home',
    href: '//www.nomkhonwaan.com',
    iconClass: 'fa fa-fw fa-home'
  }, {
    title: 'GitHub',
    href: '//github.com/nomkhonwaan',
    iconClass: 'fa fa-fw fa-github-square'
  }, {
    title: 'Twitter',
    href: '//twitter.com/nomkhonwaan',
    iconClass: 'fa fa-fw fa-twitter-square'
  }, {
    title: 'LinkedIn',
    href: '//linkedin.com/in/nomkhonwaan',
    iconClass: 'fa fa-fw fa-linkedin-square' 
  }, {
    title: 'RSS',
    href: '//www.nomkhonwaan.com/rss',
    iconClass: 'fa fa-fw fa-rss-square' 
  }]
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