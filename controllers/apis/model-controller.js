const Model = require('../../models/model.js')

const modelServices = require('../../services/model-services.js')

const modelController = {
  getModels: (req, res, next) => {
    modelServices.getModels(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  postModel: (req, res, next) => {
    modelServices.postModel(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  getModel: (req, res, next) => {
    modelServices.getModel(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  putModel: (req, res, next) => {
    modelServices.putModel(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  deleteModel: (req, res, next) => {
    modelServices.deleteModel(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  }
}

module.exports = modelController