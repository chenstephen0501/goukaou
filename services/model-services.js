const Model = require('../models/model.js')

const modelServices = {
  getModels: (req, cb) => {
    return Model
      .find()
      .lean()
      .then(models => {
        return cb(null, { models })
      })
      .catch(err => cb(err))
  },
}

module.exports = modelServices