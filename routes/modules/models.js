const express = require('express')
const router = express.Router()

const Model = require('../../models/model.js')

router.get('/', (req, res) => {
  return Model
    .find()
    .lean()
    .then(models => {
      return res.render('admin/model', { models })
    })
})

module.exports = router