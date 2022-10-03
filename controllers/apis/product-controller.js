const productServices = require('../../services/product-services.js')

const productController = {
  getHome: (req, res, next) => {
    productServices.getHome(req, (err, data) => err ? next(err) : res.json(data))
  },
  getGoukaou: (req, res, next) => {
    productServices.getGoukaou(req, (err, data) => err ? next(err) : res.json(data))
  },
  getMaskOnSale: (req, res, next) => {
    productServices.getMaskOnSale(req, (err, data) => err ? next(err) : res.json(data))
  },
  getMaskOffSale: (req, res, next) => {
    productServices.getMaskOffSale(req, (err, data) => err ? next(err) : res.json(data))
  },
  getOnSaleImg: (req, res, next) => {
    productServices.getOnSaleImg(req, (err, data) => err ? next(err) : res.json(data))
  },
  getOffSaleImg: (req, res, next) => {
    productServices.getOffSaleImg(req, (err, data) => err ? next(err) : res.json(data))
  },
  getZentaiSuit: (req, res, next) => {
    productServices.getZentaiSuit(req, (err, data) => err ? next(err) : res.json(data))
  },
  getContact: (req, res, next) => {
    productServices.getContact(req, (err, data) => err ? next(err) : res.json(data))
  },
  postContact: async (req, res, next) => {
    productServices.postContact(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = productController