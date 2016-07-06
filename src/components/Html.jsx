import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'

const Html = ({ assets, components, initialState }) => {
  const head = Helmet.rewind()
  const content = (components
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
      
      <link rel="icon" href={require('../images/favicon.ico')} />
      <link rel="icon" type="image/png" sizes="32x32" href={require('../images/favicon-32x32.png')} />
      <link rel="icon" type="image/png" sizes="96x96" href={require('../images/favicon-96x96.png')} />
      <link rel="icon" type="image/png" sizes="16x16" href={require('../images/favicon-16x16.png')} />
      
      <link rel="stylesheet" href={ assets.styles.preload } />
      
      <meta name="theme-color" content="#78909c" />
      <meta name="msapplication-navbutton-color" content="#78909c" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#78909c" />
    </head>
    <body>
      <div className="preload">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>

      <div id="root" dangerouslySetInnerHTML={ { __html: content } }></div>

      <noscript id="deferred-styles">
        <link rel="stylesheet" href={ assets.styles.postload } />
      </noscript>
      
      <script dangerouslySetInnerHTML={ {
        __html: `
          var loadDeferredStyles = function() {
            var addStylesNode = document.getElementById('deferred-styles')
            var replacement = document.createElement('div')

            replacement.innerHTML = addStylesNode.textContent
            document.body.appendChild(replacement)
            addStylesNode.parentElement.removeChild(addStylesNode)
          }

          var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame 
          if (raf) {
            raf(function() {
              window.setTimeout(loadDeferredStyles, 0)
            })
          } else {
            window.addEventListener('load', loadDeferredStyles)
          }
        `
      } }>
      </script>

      <script dangerouslySetInnerHTML={ {
        __html: `
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        `
      } }></script>
      <script dangerouslySetInnerHTML={ {
        __html: `
          var _gaq=[['_setAccount','UA-33411047-1'],['_trackPageview']];
          (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
          g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
          s.parentNode.insertBefore(g,s)}(document,'script'));
        `
      } }></script>
      
      <script async src={ assets.javascript.main }></script> 
    </body>
    </html>
  )
}

Html.propTypes = {
  assets: PropTypes.object,
  components: PropTypes.node,
  initialState: PropTypes.object
}

export default Html