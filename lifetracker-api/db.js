"use strict"

/** Database setup for Fitty Health Tracker. */

const { Client } = require("pg") // 
const { getDatabaseUri } = require("./utils/config")
require("colors") // for console log color coding

const db = new Client({ connectionString: getDatabaseUri() })

db.connect((err) => {
  if (err) {
    console.error("connection error", err.stack)
  } else {
    console.log("Successfully connected to postgres database!".blue)
  }
})

module.exports = db