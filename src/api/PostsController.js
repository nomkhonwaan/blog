import _ from 'lodash'
import mongoose from 'mongoose'
import pagination from './utils/pagination'

const format = ({
  _id,
  title,
  slug,
  publishedAt,
  html,
  tags,
  users
}) => {
  return {
    type: 'posts',
    id: _id,
    attributes: {
      title,
      slug,
      publishedAt,
      html,
      tags,
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

export const publicFields = [
  'title',
  'slug',
  'publishedAt',
  'html',
  'tags',
  'users'
]

export const Model = (mongoose.models.Post
  ? mongoose.model('Post')
  : mongoose.model('Post', new mongoose.Schema({
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date,
    publishedAt: Date,
    tags: [ mongoose.Schema.Types.Mixed ],
    users: [ mongoose.Schema.Types.Mixed ],
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },
    markdown: String,
    html: String
  }, {
    collection: 'posts'
  })
))

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
          Model.
            count(conditions, (err, totalItems) => {
              if (err) {
                return reject(err)
              }
              return resolve(totalItems)
            })
        }),
        new Promise((resolve, reject) => {
          Model.
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
            links: pagination(
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
  }

}
