import React from 'react'

const Author = () => {
  return (
    <div className="author">
      <a className="avatar" href="https://www.nomkhonwaan.com">
        <img src={ require('../images/avatar.jpg') } alt="Natcha Luang - Aroonchai" />
      </a>
      <h2 className="description">Trust me I'm Petdo</h2>
      <div className="location">Bangkok, Thailand</div>
    </div>
  )
}

export default Author