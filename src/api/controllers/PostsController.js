import _ from 'lodash'
import mongoose from 'mongoose'
import { AllHtmlEntities as Entities } from 'html-entities'

import Post, { publicFields } from '../models/Post'
import links from '../utils/links'

function format({
  _id,
  title,
  slug,
  publishedAt,
  html,
  tags,
  users
}) {
  const entities = new Entities()

  return {
    type: 'posts',
    id: _id,
    attributes: {
      title,
      slug,
      publishedAt,
      html: entities.encode(html),
      tags: tags.
        map(({ name, slug }) => {
          return {
            name,
            slug
          }
        }),
    },
    relationships: {
      author: {
        data: users.
          reduce((result, { id }) => {
            result.push({
              type: 'users',
              id
            })
            return result
          }, [])
      }
    }
  }
}

export default {

  getAll: (req, res, next) => {
    try {
      const page = req.query.page || {}
      page.number = parseInt(page.number) || 1
      page.size = parseInt(page.size) || 5

      const conditions = {
        publishedAt: {
          '$exists': true
        }
      }

      Promise.all([
        new Promise((resolve, reject) => {
          Post.
            count(conditions, (err, totalItems) => {
              if (err) {
                return reject(err)
              }
              return resolve(totalItems)
            })
        }),
        new Promise((resolve, reject) => {
          Post.
            find(conditions).
            select(publicFields.join(' ')).
            limit(page.size).
            skip((page.number - 1) * page.size).
            sort({
              publishedAt: 'desc'
            }).
            exec((err, items) => {
              if (err) {
                return reject(err)
              }
              return resolve(items)
            })
        })
      ]).
      then(([ totalItems, items ]) => {
        return res.
          json({
            meta: {
              totalItems
            },
            links: links(
              page.number,
              page.size,
              totalItems,
              req.originalUrl
            ),
            data: items.
              reduce((result, item) => {
                result.push(format(item))
                return result
              }, []),
            included: items.
              map((item) => {
                return item.users
              }).
              reduce((result, item) => {
                return _.uniqBy(result.concat(item), 'email')
              }, []).
              reduce((result, { id, displayName, email }) => {
                result.push({
                  type: 'users',
                  id,
                  attributes: {
                    displayName,
                    email
                  }
                })
                return result
              }, [])
          })
      }).
      catch((err) => {
        return next(err)
      })
    } catch (err) {
      return next(err)
    }
  },

  getOne: (req, res, next) => {
    try {
      const id = req.params.id

      Promise.all([
        new Promise((resolve, reject) => {
          if (mongoose.Types.ObjectId.isValid(id)) {
            Post.
              findById(id, (err, item) => {
                if (err) {
                  return reject(err)
                }
                return resolve(item)
              })
          } else {
            Post. 
              findBySlug(id, (err, item) => {
                if (err) {
                  return reject(err)
                }
                return resolve(item)
              })
          }
        })
      ]). 
      then(([ item ]) => {
        return res. 
          json({
            links: {
              self: req.originalUrl
            },
            data: format(item),
            included: item.
              users.
              reduce((result, { id, displayName, email }) => {
                result.push({
                  type: 'users',
                  id,
                  attributes: {
                    displayName,
                    email
                  }
                })

                return result
              }, [])
          })
      }). 
      catch((err) => {
        return next(err)
      })
    } catch (err) {
      return next(err)
    }
  }

}
