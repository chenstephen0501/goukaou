const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')

passport.use(new LocalStrategy({ 
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
   (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error_messages', '電子郵件尚未註冊 !'))
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('error_messages', '密碼或電子郵件錯誤 !'))
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }
))

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  User.findById({ _id: id })
    .lean()
    .then(user => {
      done(null, user)
    })
    .catch(err => done(err, null))
  // User.findById(id, function (err, user) {
  //   done(err, user)
  // })
})

module.exports = passport