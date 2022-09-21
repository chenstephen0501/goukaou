const express = require('express')
const router = express.Router()

const User = require('../../models/user.js')

router.get('/', (req, res) => {
  res.render('register')
}),

router.post('/', (req, res) => {
  const { name, eamil, password, checkPassword } = req.body
  console.log(req.body)
  if (!name || !email || !password || !checkPassword) {
    req.flash('errors_messages', '密碼與確認密不相同。')
    return res.redirect('back')
  }
  return Promise.all([
    User.find({ name }).lean(),
    User.find({ email }).lean()
  ])
    .then(([checkName, checkEmail]) => {
      if (checkName) {
        req.flash('errors_messages', '此名字己被使用。')
        return res.redirect('back')
      }
      if (checkName) {
        req.flash('errors_messages', '此郵件己被使用。')
        return res.redirect('back')
      }
      return User.create({
        name,
        email,
        password
      })
    })
    .then(() => res.render('login'))
    .catch(err => console.error(err))
})

module.exports = router