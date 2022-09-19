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

router.get('/:modelId', (req, res) => {
  const modelId = req.params.modelId
  return Promise.all([
    Model.find().lean(),
    Model.findById({ _id: modelId }).lean()
  ])
    .then(([models, model]) => {
      return res.render('admin/model' ,{ models, model })
    })
})

router.put('/:modelId', (req, res) => {
  const modelId = req.params.modelId
  const { name } = req.body
  if (!name) {
    return res.redirect('back')
  }
  return Model
    .find({ _id: { $nin: [modelId] } })
    .lean()
    .then((models) => {
      const checkModel = models.some(item => item.name === name)
      if (checkModel) {
        return res.redirect('back')
      }
      return Model.updateOne({ _id: modelId }, { name })
    })
    .then(() => res.redirect('/admin/models'))
    .catch(err => console.error(err))
})

router.delete('/:modelId', (req, res) => {
  const modelId = req.params.modelId
  return Model.findById({ _id: modelId })
    .then(model => {
      return model.remove()
    })
    .then(() => res.redirect('/admin/models'))
    .catch(err => console.error(err))
})

module.exports = router