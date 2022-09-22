const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next()}
    req.flash('sucesss_messages', '成功登出。')
    res.redirect('login')
  }) 
})

module.exports = router