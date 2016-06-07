import React from 'react'

const Author = () => {
  const styles = require('../stylesheets/Author.scss')

  return (
    <div className={ styles.author }>
      <a className={ styles.avatar } href="https://www.nomkhonwaan.com">
        <img src={ require('../images/avatar.jpg') } alt="Natcha Luang - Aroonchai" />
      </a>
      <h2 className={ styles.description }>Trust me I'm Petdo</h2>
      <div className={ styles.location }>Bangkok, Thailand</div>
    </div>
  )
}

export default Author