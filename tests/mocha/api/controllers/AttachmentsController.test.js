import { expect } from 'chai'
import Express from 'express'
import fs from 'fs'
import mongoose from 'mongoose'
import sinon from 'sinon'
import request from 'supertest'

import Attachment from '../../../../src/api/models/Attachment'
import apiRoutes from '../../../../src/api/routes'

const attachments = [{ 
  _id: mongoose.Types.ObjectId(),
  filename: '1.png',
  contentType: 'binary/octet-stream',
  length: 36754,
  chunkSize: 261120,
  uploadDate: Date.now(),
  aliases: null,
  metadata: null,
  md5: '6f022478bd0971a322924d62338227bd'
}]

describe('api/controllers/Attachments', () => {
  let agent
  let AttachmentMock 
  let readStreamSpy

  before(() => {
    const app = Express()
    app.use('/api', apiRoutes)
    agent = request.agent(app)
  })

  beforeEach(() => {
    AttachmentMock = sinon.mock(Attachment)
    readStreamSpy = {
      on: sinon.spy(),
      pipe: (res) => {
        return res.send()
      }
    }
    sinon.mock(fs).expects('createReadStream').returns(readStreamSpy)
  })

  afterEach(() => {
    AttachmentMock.restore()
  })

  describe('getOne', () => {
    it('should return a response from GridFS stream', (done) => {
      AttachmentMock.
        expects('findOne').
          withArgs(attachments[0]._id.toString()).
        returns(new Promise((resolve) => {
          return resolve([ attachments[0], readStreamSpy ])
        }))
      
      agent.
        get(`/api/v1/attachments/${attachments[0]._id}`).
        end((err, resp) => {
          expect(resp.header['content-type']).to.equal(attachments[0].contentType)
          expect(readStreamSpy.on.called).to.be.true

          done()
        })
    })
  })
})