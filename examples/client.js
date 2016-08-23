const sms506 = require('../lib/index');

console.log(sms506)

var smsApi = sms506("ABC123")

smsApi.smsin('08-2016').then(function(res) {
  console.log(res)
}).catch(function(e) {
  console.log('error', e)
})
