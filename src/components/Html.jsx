import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'

const Html = ({ assets, components, initialState }) => {
  const head = Helmet.rewind()
  const content = (components
    ? renderToString(components)
    : null)
  const styles = Object.assign({}, 
    require('../stylesheets/Nav.scss'))

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
      
      <meta name="theme-color" content="#78909c" />
      <meta name="msapplication-navbutton-color" content="#78909c" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#78909c" />

      <style dangerouslySetInnerHTML={ {
        __html: `
          .root {
            opacity: 0;
            visibility: hidden;
          }

          .${styles.preload} {
            align-items: center;
            background-color: #78909c;
            display: flex;
            bottom: 0;
            justify-content: center;
            left: 0;
            right: 0;
            top: 0;
            position: fixed;
          }

          .spinner {
            width: 40px;
            height: 40px;

            position: relative;
            margin: 100px auto;
          }

          .double-bounce1, .double-bounce2 {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #def4ff;
            opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;
            
            -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
            animation: sk-bounce 2.0s infinite ease-in-out;
          }

          .double-bounce2 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
          }

          @-webkit-keyframes sk-bounce {
            0%, 100% { -webkit-transform: scale(0.0) }
            50% { -webkit-transform: scale(1.0) }
          }

          @keyframes sk-bounce {
            0%, 100% { 
              transform: scale(0.0);
              -webkit-transform: scale(0.0);
            } 50% { 
              transform: scale(1.0);
              -webkit-transform: scale(1.0);
            }
          }
        `
      } }>
      </style>
    </head>
    <body>
      <div className={ styles.preload }>
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>

      <div id="root" dangerouslySetInnerHTML={ { __html: content } }></div>

      <noscript id="deferred-styles">
        {
          Object.keys(assets.styles).map((item, key) => {
            return (
              <link rel="stylesheet" href={ assets.styles[item] } key={ key } />
            )
          }) 
        }
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

          var raf = requestAnimationFrame || mozRequestAnimationFrame ||
                    webkitRequestAnimationFrame || msRequestAnimationFrame 
          
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
      
      {
        Object.keys(assets.javascript).map((item, key) => {
          return (
            <script async src={ assets.javascript[item] } key={ key }></script> 
          )
        })
      }
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