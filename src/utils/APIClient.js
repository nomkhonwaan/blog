import fetch from 'isomorphic-fetch'
import url from 'url'

import config from '../config'
import { isServer } from './whereami'

export default class APIClient {

  constructor({ path, method, query, body }) {
    const apiUrlObject = new url.Url()

    apiUrlObject.pathname = path
    apiUrlObject.protocol = (isServer() ? 'http' : window.location.protocol)
    apiUrlObject.host = (isServer() ? `localhost:${config.PORT}`: `${window.location.host}`)

    if (query) {
      apiUrlObject.query = query
    }

    return new Promise((resolve, reject) => {
      fetch(decodeURI(url.format(apiUrlObject))).
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

}
