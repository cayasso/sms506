# sms506

[![Build Status](https://travis-ci.org/cayasso/sms506.png?branch=master)](https://travis-ci.org/cayasso/sms506)
[![NPM version](https://badge.fury.io/js/sms506.png)](http://badge.fury.io/js/sms506)

Simple [sms506](http://www.sms506.com/) API wrapper for NodeJS.

## Installation

``` bash
$ npm install sms506
```

## Usage

```javascript
var sms506 = require('sms506')
var smsApi = sms506(API_KEY, [options])

smsApi.sms('88888888').then(data => {
  if (err) return console.error(err)
  console.log(data) // => { ok: true }
}).catch(error => {
  console.error(error)
})

smsApi.smsin('19-08-2016').then(data => {
  if (err) return console.error(err)
  console.log(data) // => [{ "fecha":	" 23-06-2014	08:44", "telf":	"88401060", "txt":	"Contestar" }, {...}]
}).catch(error => {
  console.error(error)
})

smsApi.stats('8').then(data => {
  if (err) return console.error(err)
  console.log(data) // => { count: 10 }
}).catch(error => {
  console.error(error)
})

smsApi.balance().then(data => {
  if (err) return console.error(err)
  console.log(data) // => { balance: 10 }
}).catch(error => {
  console.error(error)
})

// Error { error: true, message: "Missing text", code: 3 }
```

All the methods bellow return a Javascript Promise in order to better handle their async nature.

```Javascript
smsApi.sms('88888888').then(data => {
  if (err) return console.error(err)
  console.log(data)
}).catch(error => {
  console.error(error)
})
```

You can use `async/await` if you are using `Babel` in Node.

```javascript
async function send(phone, message) {
  try {
    await smsApi.sms(phone, message)
  } catch(e) {
    console.error(e)
  }
}

send(88888888, 'Hello my friend!')
```

## API

You will need an [sms506](http://www.sms506.com/) API token in order to use this library.

### sms506(apiKey, [options])

Create an API instance by passing your sms506 `apiKey`.

Options are:

* `host`: Api host, by default it is `https://api.sms506.com`.

### sms(to, text)

Send a sms message (`text`) to the specified `to` number.

The `to` number can be in any of these formats `88888888`, `50688888888`, `+50688888888`, the number itself should be a valid CR mobile number.

### smsin(date)

Returns a list of incoming responses to sms messages during an specific `date` or a month. If no date is passed then the current date will be used.

The `date` argument can be in any of these formats:

 * for an specific month `MM-YYYY`, `MM/YYYY`
 * and for an specific date `DD-MM-YYYY`, `DD/MM/YYYY`.

### stats(month)

Return stats of sms messages sent during an specific `month`. If no month is passed then the current month will be used.
The `month` arguments can be in any of these formats:

 * in english `August`, `Aug`
 * in spanish `Agosto`, `Ago`
 * or simple number `8`.

### balance()

Return the remaining user balance (sms).

## Run tests

``` bash
$ npm install
$ make test
```

## License

Under The MIT License
