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

router.post('/', (req, res) => {
  const { name } = req.body
  if (!name) { 
    return res.redirect('back')
  }
  return Promise.all([
    Model.find().lean(),
    Model.findOne({ name }).lean()
  ]) 
    .then(([models, model]) => {
      if (!model) {
        return Model.create({ name })
          .then(() => res.redirect('back'))
      }
      return res.render('admin/model', { models, model })
    })
    .catch(err => console.error(err))
})

module.exports = router