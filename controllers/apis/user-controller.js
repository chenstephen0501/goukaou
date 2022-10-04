const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const User = require('../../models/user.js')

const userController = {
  login: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      res.json({ 'status': 'success', data: {
        token,
        user: userData
      }})
    } catch (err) {
      console.log('err', err)
      next(err)
    }
  },
  logout: (req, res, next) => {
    req.logout()
    req.flash('success_messages', '成功登出')
    return res.redirect('/login')
  }, 
  register: (req, res, next) => {
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
  }

}

module.exports = userController