import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'

const Html = ({ components }) => {
  const head = Helmet.rewind()
  const __html = (components
    ? renderToString(components)
    : null)
    
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width,minimum-scale=1" />
      <meta name="author" content="Natcha Luang - Aroonchai" />
      <meta name="description" content="Trust me I'm Petdo" />
      <meta name="theme-color" content="#78909c" />
      <meta name="msapplication-navbutton-color" content="#78909c" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#78909c" />
      
      { head.title.toComponent() }
      
      <meta name="theme-color" content="#78909c" />
      <meta name="msapplication-navbutton-color" content="#78909c" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#78909c" />
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={ { __html } }></div>
    </body>
    </html>
  )
}

Html.propTypes = {
  components: PropTypes.node
}

export default Html