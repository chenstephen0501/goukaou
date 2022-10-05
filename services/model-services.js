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
  postModel: (req, cb) => {
    const { name } = req.body
    if (!name) throw new Error('模型名稱不能為空!')
    return Promise.all([
      Model.find().lean(),
      Model.findOne({ name }).lean()
    ])
      .then(([models, model]) => {
        if (!models) {
          const err = new Error('找不到所有模型資料')
          err.status = 404
          throw err
        }
        if (model) {
          const err = new Error(`名稱 [${name}] 己經被使用過，請更換!`)
          err.status = 404
          throw err
        }
        return Model.create({ name })
          .then((createModel) => {
            return cb(null, { model: createModel })
          })
      })
      .catch(err => cb(err))
  },
  getModel: (req, cb) => {
    const modelId = req.params.modelId
    return Promise.all([
      Model.find().lean(),
      Model.findById(modelId).lean()
    ])
      .then(([models, model]) => {
        if (!models) {
          const err = new Error('找不到所有模型資料')
          err.status = 404
          throw err
        }
        if (!model) {
          const err = new Error('找不到這個模型資料')
          err.status = 404
          throw err
        }
        return cb(null, { models, model })
      })
      .catch(err => cb(err))
  },
  putModel: (req, cb) => {
    const modelId = req.params.modelId
    const { name } = req.body
    if (!name) {
      const err = new Error('模型名稱不能為空!')
      err.status = 404
      throw err
    }
    return Promise.all([
      Model.find({ _id: { $nin: [modelId] } }).lean(),
      Model.findById(modelId)
    ])
      .then(([models, model]) => {
        if (!models) {
          const err = new Error('找不到所有模型資料')
          err.status = 404
          throw err
        }
        if (!model) {
          const err = new Error('找不到這個模型資料')
          err.status = 404
          throw err
        }
        const checkModel = models.some(item => item.name === name)
        if (checkModel) {
          const err = new Error(`名稱 [${name}] 己經被使用過，請更換!`)
          err.status = 404
          throw err
        }
        model.name = name
        return model.save()
          .then((updateModel) => {
            return cb(null, { model: updateModel })
          })
      })
      .catch(err => cb(err))
  },
  deleteModel: (req, cb) => {
    const modelId = req.params.modelId
    return Model.findById({ _id: modelId })
      .then(model => {
        if (!model) {
          const err = new Error('找不到這個模型資料')
          err.status = 404
          throw err
        }
        return model.remove()
      })
      .then((deleteModel) => {
        return cb(null, { model: deleteModel })
      })
      .catch(err => cb(err))
  }
}

module.exports = modelServices