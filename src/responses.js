'use strict'

export default {
  sms: {
    "0": { ok: true },
    "1": { error: true, message: "Missing api key", code: 1 },
    "2": { error: true, message: "Mising mobile number", code: 2 },
    "3": { error: true, message: "Missing text", code: 3 },
    "4": { error: true, message: "Not enough balance", code: 4 },
    "9": { error: true, message: "Invalid message length", code: 9 },
    "10": { error: true, message: "Invalid mobile number", code: 10 },
    "11": { error: true, message: "Invalid mobile number", code: 11 },
    "20": { error: true, message: "Invalid text", code: 20 },
    "30": { error: true, message: "IP	not	authorized", code: 30 },
    "90": { error: true, message: "API error", code: 90 },
    "99": { error: true, message: "User not authorized", code: 99 }
  },

  smsin: {
    "0": [],
    "-1": { error: true, message: "Missing api key", code: -1 },
    "-2": { error: true, message: "Invalid day", code: -2 },
    "-3": { error: true, message: "Invalid month", code: -3 },
    "-4": { error: true, message: "Invalid year", code: -4 },
    "-99": { error: true, message: "User not authorized", code: -99 },
    "400": { error: true, message: "Invalid date provided", code: -99 }
  },

  stats: {
    "-1": { error: true, message: "Missing api key", code: -1 },
    "-2": { error: true, message: "Invalid month", code: -2 },
    "-99": { error: true, message: "User not authorized", code: -99 }
  },

  balance: {
    "-1": { error: true, message: "Missing api key", code: -1 },
    "-99": { error: true, message: "User not authorized", code: -99 }
  }
}
