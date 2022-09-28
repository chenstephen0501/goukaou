const Model = require('../models/model.js')

const modelController = {
  getModels: (req, res) => {
    return Model
      .find()
      .lean()
      .then(models => {
        return res.render('admin/models', { models })
      })
  },
  postModel: (req, res) => {
    const { name } = req.body
    if (!name) throw new Error('模型名稱不能為空!')
    return Promise.all([
      Model.find().lean(),
      Model.findOne({ name }).lean()
    ])
      .then(([models, model]) => {
        if (!models) throw new Error('找不到所有模型資料!')
        if (model) {
          return res.render('admin/models', { models, model })
        }
        return Model.create({ name })
          .then(() => {
            req.flash('success_messages', '新增模型成功。')
            return res.redirect('back')
          })
      })
      .catch(err => console.error(err))
  },
  getModel: (req, res, next) => {
    const modelId = req.params.modelId
    return Promise.all([
      Model.find().lean(),
      Model.findById(modelId).lean()
    ])
      .then(([models, model]) => {
        if (!models) throw new Error('找不到所有模型資料!')
        if (!model) throw new Error('找不到這個模型資料!')
        return res.render('admin/models', { models, model })
      })
      .catch(err => next(err))
  },
  putModel: (req, res) => {
    const modelId = req.params.modelId
    const { name } = req.body
    if (!name) {
      return res.redirect('back')
    }
    return Promise.all([
      Model.find({ _id: { $nin: [modelId] } }).lean(),
      Model.findById(modelId).lean()
    ])
      .then(([models, model]) => {
        if (!models) throw new Error('找不到所有模型資料!')
        if (!model) throw new Error('找不到這個模型資料!')
        const checkModel = models.some(item => item.name === name)
        if (checkModel) {
          req.flash('error_messages', '這個名稱已被使用!')
          return res.redirect('back')
        }
        return Model.updateOne({ _id: modelId }, { name })
          .then(() => {
            req.flash('success_messages', '編輯成功!')
            return res.redirect('/admin/models')
          })
      })
      .catch(err => console.error(err))
  },
  deleteModel: (req, res) => {
    const modelId = req.params.modelId
    return Model.findById({ _id: modelId })
      .then(model => {
        if (!model) throw new Error('找不到這個模型資料!')
        return model.remove()
      })
      .then(() => res.redirect('/admin/models'))
      .catch(err => console.error(err))
  }
}

module.exports = modelController