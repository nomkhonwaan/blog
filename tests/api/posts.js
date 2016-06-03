import chai from 'chai'
import sinon from 'sinon'
import Express from 'express'
import request from 'supertest'
import mongoose from 'mongoose'

import 'sinon-mongoose'

import routes from '../../src/api/routes'
import Posts, { Model as PostModel, publicFields } from '../../src/api/posts'

const users = [{
  id: mongoose.Types.ObjectId(),
  displayName: 'Natcha Luang - Aroonchai',
  email: 'me@nomkhonwaan.com'
}]

const posts = [{
  _id: mongoose.Types.ObjectId(),
  publishedAt: Date.now(),
  tags: [{
    name: 'Ant',
    slug: 'ant'
  }],
  title: '[Mock] Ant',
  slug: 'mock-ant',
  markdown: 'Ant',
  html: '<p>Ant</p>',
  users
}, {
  _id: mongoose.Types.ObjectId(),
  publishedAt: Date.now(),
  tags: [{
    name: 'Bird',
    slug: 'bird'
  }],
  title: '[Mock] Bird',
  slug: 'mock-bird',
  markdown: 'Bird',
  html: '<p>Bird</p>',
  users
}, {
  _id: mongoose.Types.ObjectId(),
  publishedAt: Date.now(),
  tags: [{
    name: 'Cat',
    slug: 'cat'
  }],
  title: '[Mock] Cat',
  slug: 'mock-cat',
  markdown: 'Cat',
  html: '<p>Cat</p>',
  users
}]

xdescribe('api/posts.js', () => {
  let agent
  let PostModelMock

  before(() => {
    const app = Express()
    app.use('/api/v1', routes)

    agent = request.agent(app)
  })

  beforeEach(() => {
    PostModelMock = sinon.mock(PostModel)
  })

  afterEach(() => {
    PostModelMock.restore()
  })

  describe('getIndex :: only published posts', () => {
    beforeEach(() => {
      PostModelMock.
        expects('count').
          withArgs({
            publishedAt: {
              '$exists': true
            }
          }).
        yields(null, 3)
    })

    afterEach(() => {
      PostModelMock.restore()
    })

    it('should return list of published post', (done) => {
      PostModelMock.
        expects('find').
          withArgs({
            publishedAt: {
              '$exists': true
            }
          }).
        chain('select').
          withArgs(publicFields.join(' ')).
        chain('limit').
          withArgs(5).
        chain('skip').
          withArgs((1 - 1) * 5).
        chain('sort').
          withArgs({
            publishedAt: 'desc'
          }).
        chain('exec').
        yields(null, posts)

      agent.
        get('/api/v1/posts').
        end((err, { body }) => {
          expect(err).to.be.null

          const { meta, links, data, included } = body

          expect(meta.totalItems).to.equal(3)

          expect(links.self).to.match(/(?=.*page\[number\]\=1)(?=.*page\[size\]\=5).*$/)
          expect(links.next).to.be.undefined
          expect(links.previous).to.be.undefined

          expect(data).to.have.length.of.at.most(5)
          expect(data[0]).to.deep.equal({
            type: 'posts',
            id: posts[0]._id.toString(),
            attributes: {
              publishedAt: posts[0].publishedAt,
              tags: posts[0].tags,
              title: posts[0].title,
              slug: posts[0].slug,
              html: posts[0].html
            },
            relationships: {
              author: {
                data: [{
                  type: 'users',
                  id: users[0].id.toString()
                }]
              }
            }
          })

          expect(included).to.have.lengthOf(1)
          expect(included[0]).to.deep.equal({
            type: 'users',
            id: users[0].id.toString(),
            attribues: {
              displayName: users[0].displayName,
              email: users[0].email
            }
          })

          done()
        })
    })
  })
})
