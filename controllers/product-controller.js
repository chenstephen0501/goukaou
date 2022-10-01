const productServices = require('../services/product-services.js')

const productController = {
  getHome: (req, res, next) => { productServices.getHome(req, (err, data) => err ? next(err) : res.render('index', data))
  },
  getGoukaou: (req, res) => {
    productServices.getGoukaou(req, (err, data) => err ? next(err) : res.render('goukaou', data))
  },
  getMaskOnSale: (req, res, next) => {
    productServices.getMaskOnSale(req, (err, data) => err ? next(err) : res.render('mask-onsale', data ))
  },
  getMaskOffSale: (req, res, next) => {
    productServices.getMaskOffSale(req, (err, data) => err ? next(err) : res.render('mask-offsale', data))
  },
  getOnSaleImg: (req, res, next) => {
    productServices.getOnSaleImg(req, (err, data) => err ? next(err) : res.render('onsale-img', data))
  },
  getOffSaleImg: (req, res, next) => {
    productServices.getOffSaleImg(req, (err, data) => err ? next(err) : res.render('offsale-img', data))
  },
  getZentaiSuit: (req, res, next) => {
    productServices.getZentaiSuit(req, (err, data) => err ? next(err) : res.render('zentai-suit', data))
  },
  getContact: (req, res, next) => {
    productServices.getContact(req, (err, data) => err ? next(err) : res.render('contact', data))
  },
  postContact: async (req, res, next) => {
    productServices.postContact(req, (err, data) => err ? next(err) : res.render('contact', data))
  }
}

module.exports = productController