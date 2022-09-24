const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res) => {
  res.render('login')
}),

router.post('/', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true,
  keepSessionInfo: true 
 })
)

router.get('/backstage', (req, res) => {
  res.render('admin/login')
}),

router.post('/backstage', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login/backstage',
  failureFlash: true
}))

module.exports = router