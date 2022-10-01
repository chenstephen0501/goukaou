const nodemailer = require('nodemailer')
const Product = require('../../models/product.js')

const linkData = [
  {
    model: 'ZENTAI SUIT GPZ-02',
    url: 'http://goukaou.blog131.fc2.com/blog-entry-424.html',
  },
  {
    model: 'ZENTAI SUIT GPZ-02-C',
    url: 'http://goukaou.blog131.fc2.com/blog-entry-359.html',
  },
  {
    model: 'Super Thick Zentai Suit GPZ-03',
    url: 'http://goukaou.blog131.fc2.com/blog-entry-449.html',
  },
  {
    model: 'Zentai Suit GPZ-04',
    url: 'http://goukaou.blog131.fc2.com/blog-entry-511.html',
  },
]

const productServices = require('../../services/product-services.js')

const productController = {
  getHome: (req, res, next) => {
    productServices.getHome(req, (err, data) => err ? next(err) : res.json(data))
  },
  getGoukaou: (req, res) => {
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