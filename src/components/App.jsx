import React, { PropTypes } from 'react'

const App = ({ children }) => {
  return (
    <div>
      {chidlren}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App