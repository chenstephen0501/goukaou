const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

passport.use(new LocalStrategy({ 
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
   (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error_messages', '密碼或電子郵件錯誤 !'))
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

const jwtOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JwtStrategy(jwtOption, (jwtPayload, cb) => {
  User.findById(jwtPayload._id, {})
    .then(user => cb(null, user))
    .catch(err => cb(err))
}))

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
})

module.exports = passport