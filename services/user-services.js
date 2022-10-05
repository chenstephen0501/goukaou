const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/user.js')

const userServices = {
  login: (req, cb) => {
    const { email, password } = req.body
    if (!email || !password) {
      const err = new Error('密碼或電子郵件欄位錯誤')
      err.status = 401
      throw err
    }
    return User.findOne({ email })
      .lean()
      .then(user => {
        if (!user) {
          const err = new Error('密碼或電子郵件錯誤')
          err.status = 401
          throw err
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              const err = new Error('密碼或電子郵件錯誤!')
              err.status = 401
              throw err
            }
            try {
              delete user.password
              const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '30d' })
              cb(null, { token, user })
            } catch (err) {
              return cb(err)
            }
          })
      })
      .catch(err => cb(err))
  },
  register: (req, cb) => {
    const { name, email, password, passwordCheck } = req.body
    if (!name || !email || !password || !passwordCheck) {
      const err = new Error('所有欄位都要填寫。')
      err.status = 401
      throw err
    }
    if (password !== passwordCheck) {
      const err = new Error('密碼與確認密不相同。')
      err.status = 401
      throw err
    }
    return Promise.all([
      User.find({ name }).lean(),
      User.find({ email }).lean()
    ])
      .then(([checkName, checkEmail]) => {
        if (checkEmail[0]) {
          const err = new Error('此郵件己被註冊。')
          err.status = 401
          throw err
        }
        if (checkName[0]) {
          const err = new Error('此名字己被註冊。')
          err.status = 401
          throw err
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
        const { password, ...result } = user.toJSON()
        cb(null, { user: result })
      })
      .catch(err => cb(err))
  }
}

module.exports = userServices