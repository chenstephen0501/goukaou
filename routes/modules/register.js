const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../../models/user.js')

router.get('/', (req, res) => {
  res.render('register')
}),

  router.post('/', (req, res, next) => {
    const { name, email, password, passwordCheck } = req.body
    if (!name || !email || !password || !passwordCheck) throw new Error('所有欄位都要填寫。')
    if (password !== passwordCheck) throw new Error('密碼與確認密不相同。')
    return Promise.all([
      User.find({ name }).lean(),
      User.find({ email }).lean(),
    ])
      .then(([checkName, checkEmail]) => {
        if (checkEmail[0]) throw new Error('此郵件己被註冊。')
        if (checkName[0]) throw new Error('此名字己被使用。')
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
        return res.redirect('/login')
      })
      .catch(err => next(err))
  })

module.exports = router