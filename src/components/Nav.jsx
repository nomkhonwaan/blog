import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { onClickMenuButton } from '../actions/NavActions'

const Nav = ({ dispatch, isExpanded }) => {
  const menuItems = [{
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
  
  return (
    <nav className="layout-nav">
      <ul className={ classNames(
        'menu-list',
        { 'expanded': isExpanded }
      ) }>
        {
          menuItems.map((item, key) => {
            return (
              <li className="menu-item" key={ key }>
                <a href={ item.href }>
                  <i className={ item.iconClass }></i>&nbsp;{ item.title }
                </a>
              </li>
            )
          })
        }
      </ul>
      <button className="btn-toggle" onClick={ () => {
        dispatch(onClickMenuButton(isExpanded))
      } }>
        <i className="fa fa-fw fa-bars"></i>&nbsp;Menu
      </button>
    </nav>
  )
}

export default connect(
  (state) => ({
    ...state.nav
  })
)(Nav)