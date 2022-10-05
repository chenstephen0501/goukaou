const passport = require('../config/passport.js')
const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(403).json({
        'status': 'error', message: 'unauthorized'
      })
    }
    req.user = user
    return next()
  })(req, res, next)
}

const authenticatedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next() 
  }
  return res.status(403).json({ 'status': 'error', message: 'permission denied'})
}

module.exports = {
  authenticated,
  authenticatedAdmin
}