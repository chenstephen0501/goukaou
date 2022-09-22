const { ensureAuthenticated, getUser } = require('../tools/auth-helpers.js')

const authenticated = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('login')
}
const authenticatedAdmin = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    if (getUser(req).isAdmin) return next()
    res.redirect('/')
  } else {
    res.redirect('login')
  }
}

module.exports = { authenticated, authenticatedAdmin }