import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { Header, Footer } from './'

const App = ({ children }) => {
  return (
    <div>
      <Helmet
        title="Nomkhonwaan"
        titleTemplate="%s &middot; Trust me I'm Petdo"
        script={ [{
          type: 'text/javascript',
          src: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/highlight.min.js'
        }, {
          type: 'text/javascript',
          innerHTML: 'hljs.initHighlightingOnLoad()'
        }] } />
      <Header />
      { children }
      <Footer />
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App
