import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { Header, Footer } from './'

const App = ({ children }) => {
  return (
    <div>
      <Helmet 
        title="Nomkhonwaan"
        titleTemplate="%s &middot; Trust me I'm Petdo" />
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