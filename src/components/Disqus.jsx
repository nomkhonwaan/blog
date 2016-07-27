import React, { Component } from 'react'

export class Disqus extends Component {
  componentDidMount() {
    if (typeof DISQUS !== 'undefined') {
      DISQUS.reset({ reload: true })
    }
  }

  render() {
    return (
      <div className="comments">
        <h2>Comments</h2>

        <div id="disqus_thread"></div>
      </div>
    )
  }
}

export default Disqus
