const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res, next) => {
  req.flash('success_messages', '成功登出')
  res.redirect('/login')
})

module.exports = router