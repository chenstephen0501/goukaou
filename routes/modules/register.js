const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../../models/user.js')

router.get('/', (req, res) => {
  res.render('register')
}),

router.post('/', (req, res) => {
  const { name, email, password, checkPassword } = req.body
  console.log(req.body)
  if (!name || !email || !password || !checkPassword) {
    req.flash('error_messages', '密碼與確認密不相同。')
    return res.redirect('back')
  }
  return Promise.all([
    User.find({ name }).lean(),
    User.find({ email }).lean(),
  ])
    .then(([checkName, checkEmail]) => {
      if (checkEmail[0]) {
        req.flash('error_messages', '此郵件己被使用。')
        return res.redirect('/register')
      }
      if (checkName[0]) {
        req.flash('error_messages', '此名字己被使用。')
        return res.redirect('back')
      }
      return bcrypt.genSalt(10)
    })
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => {
      return User.create({
        name,
        email,
        password: hash
      })
    })
    .then((user) => {
      req.flash('success_messages', '註冊成功。')
      return res.render('admin/login')
    })
    .catch(err => console.error(err))
})

module.exports = router