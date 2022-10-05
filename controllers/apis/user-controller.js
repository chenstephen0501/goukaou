const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
const User = require('../../models/user.js')

const userController = {
  login: (req, res, next) => {
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
              res.json({
                'status': 'success', data: {
                  token,
                  user
                }
              })
            } catch (err) {
              next(err)
            }
          })
      })
      .catch(err => next(err))
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
        return res.json({ 'status': 'success', message: '註冊成功' })
      })
      .catch(err => next(err))
  }

}

module.exports = userController