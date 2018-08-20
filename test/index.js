'use strict'

const url = require('url')
const nock = require('nock')
const should = require('should')
const sms506 = require('../src')
const moment = require('moment')

const API_KEY = 'abc123'

describe('sms506', function() {
  it('should expose a function', function() {
    sms506.should.be.a.Function
  })

  it('should throw error if application id is missing', function() {
    ;(() => {
      sms506(null)
    }).should.throw(/pass your sms506 API Key/)
  })

  it('should allow passing options', function() {
    let smsApi = sms506('abc', {
      host: 'https://test.com'
    })
    smsApi.host.should.be.eql('https://test.com')
  })

  describe('#sms', function() {
    let smsApi = null
    let query = null
    let body = null

    beforeEach(function() {
      smsApi = sms506(API_KEY)
      nock('https://api.sms506.com').get(`/sms/${API_KEY}`).query(true).reply(200, function(uri, req) {
        query = url.parse(uri, true).query
        return {}
      })
    })

    it('should send sms by calling endpoint', (done) => {
      smsApi
        .sms('88888888', 'Test')
        .then((data) => {
          should(query).have.properties({ telf: '88888888', txt: 'Test' })
          done()
        })
        .catch(done)
    })

    it('should send phones in number and string format', (done) => {
      smsApi
        .sms(88888888, 'Test')
        .then((data) => {
          should(query).have.properties({ telf: '88888888', txt: 'Test' })
          done()
        })
        .catch(done)
    })

    it('should accept phones with country code', (done) => {
      smsApi
        .sms('50688888888', 'Test')
        .then((data) => {
          should(query).have.properties({ telf: '88888888', txt: 'Test' })
          done()
        })
        .catch(done)
    })

    it('should accept phones with country code and plus sign', (done) => {
      smsApi
        .sms('+50688888888', 'Test')
        .then((data) => {
          should(query).have.properties({ telf: '88888888', txt: 'Test' })
          done()
        })
        .catch(done)
    })

    it('should throw on invalid phone number', (done) => {
      smsApi.sms('xxx', 'Test').catch((err) => {
        should(err.message).be.match(/Invalid mobile/)
        done()
      })
    })

    it('should throw when number is not a valid CR mobile number', (done) => {
      smsApi.sms(22888888, 'Test').catch((err) => {
        should(err.message).be.match(/Invalid mobile/)
        done()
      })
    })

    it('should throw on missing phone number', (done) => {
      smsApi.sms(undefined, 'Test').catch((err) => {
        should(err.message).be.match(/Invalid mobile/)
        done()
      })
    })

    it('should throw on missing text', (done) => {
      smsApi.sms(88888888).catch((err) => {
        should(err.message).be.match(/Invalid text/)
        done()
      })
    })
  })

  describe('#smsin', function() {
    let smsApi = null
    let query = null
    let body = null

    beforeEach(function() {
      smsApi = sms506(API_KEY)
      nock('https://api.sms506.com')
        .get(`/smsin/${API_KEY}/json/23-08-2016`)
        .query(true)
        .reply(200, function(uri, req) {
          query = url.parse(uri, true).query
          return []
        })
    })

    it('should send request for sms responses', (done) => {
      smsApi
        .smsin('23-08-2016')
        .then((data) => {
          should(data).be.eql([])
          done()
        })
        .catch(done)
    })

    it('should send request by default with todays date if non provided', (done) => {
      const date = moment().format('DD-MM-YYYY')
      nock('https://api.sms506.com').get(`/smsin/${API_KEY}/json/${date}`).query(true).reply(200, function(uri, req) {
        return []
      })
      smsApi
        .smsin()
        .then((data) => {
          should(data).be.eql([])
          done()
        })
        .catch(done)
    })

    it('should send request for sms responses with a DD/MM/YYYY date format', (done) => {
      smsApi
        .smsin('23/08/2016')
        .then((data) => {
          should(data).be.eql([])
          done()
        })
        .catch(done)
    })

    it('should send request for a single month with MM/YYYY date format', (done) => {
      nock('https://api.sms506.com').get(`/smsin/${API_KEY}/json/0-08-2016`).query(true).reply(200, function(uri, req) {
        return []
      })

      smsApi
        .smsin('08/2016')
        .then((data) => {
          should(data).be.eql([])
          done()
        })
        .catch(done)
    })

    it('should send request for a single month with MM-YYYY date format', (done) => {
      nock('https://api.sms506.com').get(`/smsin/${API_KEY}/json/0-08-2016`).query(true).reply(200, function(uri, req) {
        return []
      })

      smsApi
        .smsin('08-2016')
        .then((data) => {
          should(data).be.eql([])
          done()
        })
        .catch(done)
    })

    it('should throw on invalid date', (done) => {
      smsApi.smsin('xxx').catch((err) => {
        should(err.message).be.match(/Invalid date/)
        done()
      })
    })
  })

  describe('#stats', function() {
    let smsApi = null
    let query = null
    let body = null

    beforeEach(function() {
      smsApi = sms506(API_KEY)
      nock('https://api.sms506.com').get(`/stat/${API_KEY}/8`).query(true).reply(200, function(uri, req) {
        query = url.parse(uri, true).query
        return 10
      })
    })

    it('should send request for getting stats for specified month', (done) => {
      smsApi
        .stats('August')
        .then((data) => {
          should(data).be.eql({ count: 10 })
          done()
        })
        .catch(done)
    })

    it('should send request for getting stats for specified month in spanish', (done) => {
      smsApi
        .stats('Agosto')
        .then((data) => {
          should(data).be.eql({ count: 10 })
          done()
        })
        .catch(done)
    })

    it('should send request for getting stats for specified month abbrevation', (done) => {
      smsApi
        .stats('Aug')
        .then((data) => {
          should(data).be.eql({ count: 10 })
          done()
        })
        .catch(done)
    })

    it('should send request for getting stats for specified month in spanish abbrevation', (done) => {
      smsApi
        .stats('Ago')
        .then((data) => {
          should(data).be.eql({ count: 10 })
          done()
        })
        .catch(done)
    })

    it('should send request for getting stats for specified month in number', (done) => {
      smsApi
        .stats(8)
        .then((data) => {
          should(data).be.eql({ count: 10 })
          done()
        })
        .catch(done)
    })

    it('should send request for getting stats current month if its missing', (done) => {
      nock('https://api.sms506.com')
        .get(`/stat/${API_KEY}/${moment().format('M')}`)
        .query(true)
        .reply(200, function(uri, req) {
          query = url.parse(uri, true).query
          return 10
        })
      smsApi
        .stats()
        .then((data) => {
          should(data).be.eql({ count: 10 })
          done()
        })
        .catch(done)
    })

    it('should throw on invalid month', (done) => {
      smsApi.stats('xxx').catch((err) => {
        should(err.message).be.match(/Invalid month/)
        done()
      })
    })
  })

  describe('#balance', function() {
    let smsApi = null
    let query = null
    let body = null

    beforeEach(function() {
      smsApi = sms506(API_KEY)
      nock('https://api.sms506.com').get(`/balance/${API_KEY}`).query(true).reply(200, function(uri, req) {
        query = url.parse(uri, true).query
        return 10
      })
    })

    it('should send request for getting account balance', (done) => {
      smsApi
        .balance('August')
        .then((data) => {
          should(data).be.eql({ balance: 10 })
          done()
        })
        .catch(done)
    })
  })
})
