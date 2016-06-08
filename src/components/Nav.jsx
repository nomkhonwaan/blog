import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { onClickMenuButton } from '../actions/NavActions'

const Nav = ({ dispatch, isExpanded }) => {
  const styles = Object.assign({}, 
    require('../stylesheets/Nav.scss'),
    require('font-awesome/css/font-awesome.css'))
  const menuItems = [{
    title: 'Home',
    href: '//www.nomkhonwaan.com',
    iconClass: [
      styles.fa,
      styles['fa-fw'],
      styles['fa-home'] 
    ]
  }, {
    title: 'GitHub',
    href: '//github.com/nomkhonwaan',
    iconClass: [
      styles.fa,
      styles['fa-fw'],
      styles['fa-github-square']
    ]
  }, {
    title: 'Twitter',
    href: '//twitter.com/nomkhonwaan',
    iconClass: [
      styles.fa,
      styles['fa-fw'],
      styles['fa-twitter-square']
    ]
  }, {
    title: 'LinkedIn',
    href: '//linkedin.com/in/nomkhonwaan',
    iconClass: [
      styles.fa,
      styles['fa-fw'],
      styles['fa-linkedin-square']
    ]
  }, {
    title: 'RSS',
    href: '//www.nomkhonwaan.com/rss',
    iconClass: [
      styles.fa,
      styles['fa-fw'],
      styles['fa-rss-square']
    ]
  }]
  
  return (
    <nav className={ styles['layout-nav'] }>
      <ul className={ classNames(
        styles['menu-list'],
        { [styles['expanded']]: isExpanded }
      ) }>
        {
          menuItems.map((item, key) => {
            return (
              <li className={ styles['menu-item'] } key={ key }>
                <a href={ item.href }>
                  <i className={ classNames(item.iconClass) }></i>&nbsp;{ item.title }
                </a>
              </li>
            )
          })
        }
      </ul>
      <button className={ styles['btn-toggle'] } onClick={ () => {
        dispatch(onClickMenuButton(isExpanded))
        
        document.getElementsByTagName('body')[0].
          addEventListener('touchmove', (event) => {
            if ( ! isExpanded) {
              return true;
            }
            
            event.preventDefault()
          })
      } }>
        <i classNames={ classNames(
          styles.fa,
          styles['fa-fw'],
          styles['fa-bars']
        ) }></i>&nbsp;Menu
      </button>
    </nav>
  )
}

export default connect(
  (state) => ({
    ...state.nav
  })
)(Nav)