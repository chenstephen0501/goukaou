const productServices = require('../../services/product-services.js')

const productController = {
  getHome: (req, res, next) => {
    productServices.getHome(req, (err, data) => err ? next(err) : res.json({ 'status' : 'success', data }))
  },
  getGoukaou: (req, res, next) => {
    productServices.getGoukaou(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  getMaskOnSale: (req, res, next) => {
    productServices.getMaskOnSale(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  getMaskOffSale: (req, res, next) => {
    productServices.getMaskOffSale(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  getOnSaleImg: (req, res, next) => {
    productServices.getOnSaleImg(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  getOffSaleImg: (req, res, next) => {
    productServices.getOffSaleImg(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  getZentaiSuit: (req, res, next) => {
    productServices.getZentaiSuit(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  getContact: (req, res, next) => {
    productServices.getContact(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  },
  postContact: async (req, res, next) => {
    productServices.postContact(req, (err, data) => err ? next(err) : res.json({ 'status': 'success', data }))
  }
}

module.exports = productController