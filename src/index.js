'use strict'

const phone = require('phone')
const assert = require('assert')
const moment = require('moment')
const responses = require('./responses')
const request = require('request-promise')

/**
 * Create API instance.
 *
 * @param {String} apiKey
 * @param {Object} [options]
 * @return {Object}
 * @api public
 */

module.exports = (apiKey, options = {}) => {
  assert(apiKey, 'You must pass your sms506 API Key.')
  const { host = 'https://api.sms506.com' } = options
  const allMonths = [ ...months('es'), ...months('en') ]

  function createError(msg, code) {
    let error = new Error()
    if ('object' === typeof msg) {
      error = Object.assign(error, msg)
    } else {
      error.message = msg
      error.code = code || 500
    }
    error.error = true
    return error
  }

  function months(lan) {
    moment.locale(lan)
    return [
      moment.months().map((m) => m.toLowerCase()),
      moment.monthsShort().map((m) => m.toLowerCase().replace('.', ''))
    ]
  }

  function month(str) {
    if (!isNaN(str)) return str
    str = String(str).toLowerCase()
    for (let m of allMonths) {
      let i = m.indexOf(str)
      if (~i) return i + 1
    }
  }

  function toPhone(number) {
    if (!number) return null
    let parsed = phone(String(number), 'CRI')
    if (!parsed.length) return null
    return parsed[0].replace('+506', '')
  }

  async function send(key, url, data) {
    try {
      let res = await request({ url, qs: data })
      res = responses[key][res] || res
      if ('object' === typeof res && res.error) {
        throw createError(res)
      } else {
        return res
      }
    } catch (e) {
      console.error(e)
      throw createError(e.message, 500)
    }
  }

  /**
   * Send sms message to an specific mobile number.
   *
   * @param {String|Number} to
   * @param {String} text
   * @return {Promise}
   * @api public
   */

  async function sms(to, text) {
    if (!(to = toPhone(to))) throw createError(responses['sms']['10'])
    if (!text) throw createError(responses['sms']['20'])
    return await send('sms', `${host}/sms/${apiKey}`, { telf: to, txt: text.trim() })
  }

  /**
   * Returns a list of responses received during an specific `date` or month.
   *
   * @param {String} date
   * @return {Promise}
   * @api public
   */

  async function smsin(date) {
    if (!date) date = moment()
    const _date = moment(date, [ 'DD/MM/YYYY', 'DD-MM-YYYY', 'MM-YYYY' ])
    date = _date._f === 'MM-YYYY' ? _date.format(`0-${_date._f}`) : _date.format('DD-MM-YYYY')
    if ('Invalid date' === date) throw createError(responses['smsin']['400'])
    const res = await send('smsin', `${host}/smsin/${apiKey}/json/${date}`)
    try {
      return JSON.parse(res)
    } catch (e) {
      console.log(e)
      return res
    }
  }

  /**
   * Return stats of sms sent during an specific `month`..
   *
   * @param {String|Number} month
   * @return {Promise}
   * @api public
   */

  async function stats(mon) {
    mon = !mon ? moment().format('M') : month(mon)
    if (!mon) throw createError(responses['stats']['-2'])
    return { count: (await send('stats', `${host}/stat/${apiKey}/${mon * 1}`)) * 1 }
  }

  /**
   * Get account balance.
   *
   * @return {Promise}
   * @api public
   */

  async function balance() {
    return { balance: (await send('balance', `${host}/balance/${apiKey}`)) * 1 }
  }

  return { sms, smsin, stats, balance, host, apiKey }
}
