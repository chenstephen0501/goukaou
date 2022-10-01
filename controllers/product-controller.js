const nodemailer = require('nodemailer')
const Product = require('../models/product.js')

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

const productServices = require('../services/product-services.js')

const productController = {
  getHome: (req, res) => {
    res.render('index')
  },
  getGoukaou: (req, res) => {
    res.render('goukaou')
  },
  getMaskOnSale: (req, res, next) => {
    productServices.getMaskOnSale(req, (err, data) => err ? next(err) : res.render('mask-onsale', data ))
  },
  getMaskOffSale: (req, res, next) => {
    productServices.getMaskOffSale(req, (err, data) => err ? next(err) : res.render('mask-offsale', data))
  },
  getOnSaleImg: (req, res) => {
    const _id = req.params.productId
    return Product.findOne({ _id })
      .lean()
      .then((product) => {
        res.render('onsale-img', { product: product })
      })
      .catch((err) => console.error(err))
  },
  getOffSaleImg: (req, res) => {
    const _id = req.params.productId
    return Product.findOne({ _id })
      .lean()
      .then((product) => {
        res.render('offsale-img', { product: product })
      })
      .catch((err) => console.error(err))
  },
  getZentaiSuit: (req, res) => {
    let imgLength = 0
    return Product.find({ category: 'zentai' })
      .lean()
      .then((products) => {
        let newProducts
        products = products.map((item, _iIndex) => {
          linkData.forEach((j, _jIndex) => {
            if (j.model === item.model) { 
              item = { ...item, url: j.url }
            }
          })
          return item
        })
        newProducts = products.sort((a, b) => {
          const indexOfa = a.model.indexOf('-')
          const indexOfb = b.model.indexOf('-')
          const newA = a.model.substr(indexOfa + 1, 2)
          const newB = b.model.substr(indexOfb + 1, 2)
          if (Number(newA) < Number(newB)) {
            return -1
          }
        })
        newProducts = newProducts.map((item, index) => {
          item.imgUrl = item.imgUrl.map((j, indexJ) => {
            j = { ...j, id: imgLength + indexJ + 1 }
            return j
          })
          imgLength += item.imgUrl.length
          return item
        })
        res.render('zentai-suit', { products: newProducts, imgLength })
      })
      .catch((err) => console.error(err))
  },
  getContact: (req, res) => {
    res.render('contact')
  },
  postContact: async (req, res) => {
    try {
      const { name, email, subject, message } = req.body
      let msg_error = ''
      let msg_success
      if (!name || !email || !subject || !message) {
        msg_error = {
          name: '訪問者',
          message: '你沒有輸入訊息 !',
        }
        return res.render('contact', { msg_error })
      }

      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
      const output = `
      <p> You have a new contact request</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name} </li>
        <li>subject: ${req.body.subject} </li>
        <li>Email: ${req.body.email} </li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `
      msg_success = {
        name: `${req.body.name}`,
        message: '詢問信件己送出。',
      }
      let info = await transporter.sendMail({
        from: `Nodemailer Contact ${process.env.EMAIL_USERNAME}`,
        to: 'tom9876555@gmail.com',
        subject: 'Node Contact Request',
        text: 'Hello world?',
        html: output,
      })
      res.render('contact', { msg_success })
    } catch (err) {
      console.warn(err)
    }
  }
}

module.exports = productController