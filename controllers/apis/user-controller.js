const userServices = require('../../services/user-services.js')

const userController = {
  login: (req, res, next) => {
    userServices.login(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  register: (req, res, next) => {
    userServices.register(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data}))
  }
}

module.exports = userController