const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../models/user.js')

const userServices = {
  loginPage: (req, cb) => {
    return cb(null, {})
  },
  registerPage: (req, cb) => {
    return cb(null, {})
  },

}

module.exports = userServices