const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../../models/user.js')

router.get('/', (req, res) => {
  res.render('register')
}),

router.post('/', (req, res) => {
  const { name, email, password, passwordCheck } = req.body
  console.log(req.body)
  if (!name || !email || !password || !passwordCheck) {
    req.flash('error_messages', '所有欄位都是必填的')
    return res.redirect('back')
  }
  if (password !== passwordCheck) {
    req.flash('error_messages', '密碼與確認密不相同。')
    return res.redirect('back')
  }
  return Promise.all([
    User.find({ name }).lean(),
    User.find({ email }).lean(),
  ])
    .then(([checkName, checkEmail]) => {
      if (checkEmail[0]) {
        req.flash('error_messages', '此郵件己被註冊。')
        return res.redirect('/register')
      }
      if (checkName[0]) {
        req.flash('error_messages', '此名字己被使用。')
        return res.redirect('back')
      }
      console.log('out')
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
    .catch(err => console.error(err))
})
// router.post('/', (req, res) => {
//   const { name, email, password, passwordCheck } = req.body
//   console.log(req.body)
//   const errors = []
//   if (!name || !email || !password || !passwordCheck) {
//     // req.flash('error_messages', '所有欄位都是必填的')
//     // return res.redirect('back')
//     errors.push({ message: '所有欄位都是必填的'
//     })
//   }
//   if (password !== passwordCheck) {
//     errors.push({ message: '密碼與確認密不相同。'
//     })
//     // req.flash('error_messages', '密碼與確認密不相同。')
//     // return res.redirect('back')
//   }
//   if (errors.length !== 0) {
//     return res.render('register', { name, email, password, passwordCheck, errors })
//   } 
//   return Promise.all([
//     User.find({ name }).lean(),
//     User.find({ email }).lean(),
//   ])
//     .then(([checkName, checkEmail]) => {
//       if (checkEmail[0]) {
//         req.flash('error_messages', '此郵件己被使用。')
//         return res.render('register', { name, email, password, passwordCheck })
//       }
//       if (checkName[0]) {
//         req.flash('error_messages', '此名字己被使用。')
//         return res.render('register', { name, email, password, passwordCheck })
//       }
//       return bcrypt.genSalt(10)
//     })
//     .then(salt => bcrypt.hash(password, salt))
//     .then(hash => {
//       return User.create({
//         name,
//         email,
//         password: hash
//       })
//     })
//     .then((user) => {
//       req.flash('success_messages', '註冊成功。')
//       return res.redirect('/login')
//     })
//     .catch(err => console.error(err))
// })

module.exports = router