const { ensureAuthenticated, getUser } = require('../tools/auth-helpers.js')

const authenticated = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    return next()
  }
  req.flash('warning_messages', '請先登入才能使用。')
  res.redirect('/login')
}
const authenticatedAdmin = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    if (getUser(req).isAdmin) { 
      return next() 
    }
    res.redirect('/')
  } else {
    req.flash('warning_messages', '請先登入才能使用。')
    res.redirect('/admin/login')
  }
}

module.exports = {
   authenticated,
    authenticatedAdmin 
  }