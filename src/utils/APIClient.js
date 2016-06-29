import fetch from 'isomorphic-fetch'
import url from 'url'

import config from '../config'

export default class APIClient {
  
  constructor({ path, method, query, body }) {
    const apiUrlObject = new url.Url()

    delete apiUrlObject.search 

    apiUrlObject.pathname = path
    apiUrlObject.protocol = (this.isServer() ? 'http' : window.location.protocol)
    apiUrlObject.host = (this.isServer() ? `localhost:${config.PORT}`: `${window.location.host}:${window.location.port}`)
    
    if (query) {
      apiUrlObject.query = query
    }

    return new Promise((resolve, reject) => {
      fetch(url.format(apiUrlObject)). 
        then((res) => {
          return res.json()
        }).
        then((body) => {
          return resolve(body)
        }).
        catch((err) => {
          return reject(err)
        })
    })
  }

  isServer() {
    return ! (typeof window !== 'undefined' && window.document);
  }

}