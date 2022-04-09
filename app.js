if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const helpers = require('./tools/helpers.js')
const mongoose = require('mongoose')

const app = express()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT 
const Product = require('./models/product.js')

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb is error !')
})
db.once('open', () => {
    console.log('mongodb is connected.')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers: helpers }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/goukaou', (req, res) => {
  res.render('goukaou')
})
app.get('/mask-onsale', (req, res) => {
  return Product.find({ production: 'true', category: 'mask' })
    .lean()
    .then((products) => {
      res.render('mask-onsale', { products })
    })
    .catch((err) => console.error(err))
})
app.get('/mask-offsale', (req, res) => {
  return Product.find({ production: 'false', category: 'mask' })
    .lean()
    .then((products) => {
      res.render('mask-offsale', { products })
    })
    .catch((err) => console.error(err))
})
app.get('/onsale-img/:_id', (req, res) => {
  const _id = req.params._id
  console.log(_id)
  return Product.findOne({ _id })
    .lean()
    .then(product => {
    res.render('onsale-img', { product: product })
    })
    .catch(err => console.error(err))
})
app.get('/offsale-img/:_id', (req, res) => {
  const _id = req.params._id
  console.log(_id)
  return Product.findOne({ _id })
    .lean()
    .then(product => {
    res.render('offsale-img', { product: product })
    })
    .catch(err => console.error(err))
})
app.get('/zentai-suit', (req, res) => {
  return Product.find({ category: 'zentai'})
    .lean()
    .then(products => {
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
      let imgLength = 0
      let newProducts = products.map((item, index) => {
        linkData.forEach((j, jIndex) => {
          if (j.model === item.model) {
            // if (jIndex === index) {
            item = { ...item, url: j.url }
          }
        })
        return item
      })
      newProducts = newProducts.map((item, index) => {
        item.imgUrl = item.imgUrl.map((j, indexJ) => {
          j = { ...j, id: imgLength + indexJ + 1 }
          return j
        })
        imgLength += item.imgUrl.length
        return item 
      })
      // const newProducts = products.map((item, index) => {
      //   linkData.forEach((j,jIndex) => {
      //     if (j.model === item.model) {
      //       // if (jIndex === index) {
      //         item = { ...item, id: index + 1, url: j.url }
      //       }
      //   })
      //   return item
      // })
      res.render('zentai-suit', { products: newProducts,  imgLength })
    })
    .catch(err => console.error(err))
})

app.get('/contact',  (req, res) => {
  res.render('contact')
})
app.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    let msg_error = ''
    let msg_success
    if (!name || !email || !subject || !message) {
      msg_error = {
        name: '訪問者',
        message: '你沒有輸入訊息 !'
      }
      return res.render('contact', { msg_error })
    }
    // let testAccount = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
        // user: testAccount.user,
        // pass: testAccount.pass,
      },
    })
    //  var mailOptions = {
    //    from: email,
    //    to: process.env.EMAIL_USERNAME,
    //    subject: `${subject} 型號`,
    //    text: `${message} 角色描述`,
    //  }

    //     transporter.sendMail(mailOptions, function(error, info) {
    //       if (error) {
    //         console.log(error);
    //       } else {
    //         console.log('Email sent: ' + info.response);
    //       }
    //     });
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
      message: '詢問信件己送出。'
    }
    let info = await transporter.sendMail({
      from: `Nodemailer Contact ${process.env.EMAIL_USERNAME}`,
      to: 'tom9876555@gmail.com',
      subject: 'Node Contact Request',
      text: 'Hello world?',
      html: output,
      // to: 'tom9876555@gmail.com',
      // subject: `${subject} 型號`,
      // text: `${message} 角色描述`,
      // html: `<b>Hello world</b> <br>寄信者名字: ${name}</br> ，<br>寄信者信箱: ${email}</br>`,
    })
    console.log('Message sent: %s', info.messageId)

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    res.render('contact', { msg_success })
  } catch (err) {
    console.warn(err)
  }
})

app.listen(PORT, () => {
  console.log(`The GOUKAOU web is running on http://localhost:${PORT}`)
})