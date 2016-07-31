import React, { Component } from 'react'
import Helmet from 'react-helmet'

export class Disqus extends Component {
  componentDidMount() {
    if (typeof DISQUS !== 'undefined') {
      DISQUS.reset({ reload: true })
    }
  }

  render() {
    return (
      <div className="comments">
        <Helmet
          script={ [{
            type: 'text/javascript',
            innerHTML: `
              (function() { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = '//nomkhonwaan.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
              })();
            `
          }] }/>
        <h2>Comments</h2>

        <div id="disqus_thread"></div>
      </div>
    )
  }
}

export default Disqus
