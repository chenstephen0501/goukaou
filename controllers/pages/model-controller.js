const Model = require('../../models/model.js')

const modelServices = require('../../services/model-services.js')

const modelController = {
  getModels: (req, res, next) => {
    modelServices.getModels(req, (err, data) => err ? next(err) : res.render('admin/models', data))
  },
  postModel: (req, res, next) => {
    modelServices.postModel(req, (err, data) => { 
      if (err) return next(err)
      req.session.createModel = data
      req.flash('success_messages', '新增模型成功。')
      return res.redirect('back')
    })
  },
  getModel: (req, res, next) => {
    modelServices.getModel(req, (err, data) => err ? next(err) : res.render('admin/models', data))
  },
  putModel: (req, res, next) => {
    modelServices.putModel(req, (err, data) => {
      if (err) return next(err)
      req.session.updateModel = data
      req.flash('success_messages', '編輯成功!')
      return res.redirect('/admin/models')
    })
  }, 
  deleteModel: (req, res, next) => {
    modelServices.deleteModel(req, (err, data) => { 
      if (err) return next(err)
      req.session.deleteModel = data
      return res.redirect('/admin/models') 
    })
  }
}

module.exports = modelController