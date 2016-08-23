# sms506

[![Build Status](https://travis-ci.org/cayasso/sms506.png?branch=master)](https://travis-ci.org/cayasso/sms506)
[![NPM version](https://badge.fury.io/js/sms506.png)](http://badge.fury.io/js/sms506)

Simple sms506 API wrapper for NodeJS.

## Installation

``` bash
$ npm install sms506
```

## Usage

```javascript
var sms506 = require('sms506')
var smsApi = sms506(API_KEY, [options])

smsApi.sms('88888888'.then(data => {
  if (err) return console.error(err)
  console.log(data)
}).catch(error => {
  console.error(error)
})

smsApi.smsin('19-08-2016'.then(data => {
  if (err) return console.error(err)
  console.log(data)
}).catch(error => {
  console.error(error)
})

smsApi.stats('8').then(data => {
  if (err) return console.error(err)
  console.log(data)
}).catch(error => {
  console.error(error)
})

smsApi.balance().then(data => {
  if (err) return console.error(err)
  console.log(data)
}).catch(error => {
  console.error(error)
})

// err => Error object
// data => formated return data
```

## API


### sms506(apiKey, [options])

Create an API instance. `apiKey` is required.

Options are:

* `host`: Api host.

### sms(to, text)

Send a sms message (`text`) to the specified `to` number.

### smsin(date)

Returns a list of responses received to sms messages during an specific `date` or a month.

### stats(month)

Return stats of sms messages sent during an specific `month`.

### balance()

Return the current account balance.

## Run tests

``` bash
$ npm install
$ make test
```

## License

Under The MIT License
