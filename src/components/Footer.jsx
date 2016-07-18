import React from 'react'

export const Footer = () => {
  return (
    <footer className="layout-footer">
      &copy;&nbsp;{new Date().getFullYear()}&nbsp;&middot;&nbsp;<strong className="copyright">www.nomkhonwaan.com</strong>&nbsp;&middot;&nbsp;Powered by&nbsp;<a href="https://facebook.github.io/react/" className="poweredby" title="React"><strong>React</strong></a>
    </footer>
  )
}

export default Footer