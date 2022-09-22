const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res) => {
  res.render('login')
}),

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
 })
)

router.get('/backstage', (req, res) => {
  res.render('admin/login')
}),

router.post('/backstage', (req, res) => {
  res.render('admin/login')
})

module.exports = router