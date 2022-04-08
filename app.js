if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const exphbs = require('express-handlebars')
const products2 = require('./products2.json')
const products3 = require('./products3.json')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const helpers = require('./tools/helpers.js')
const app = express()
const PORT = process.env.PORT 

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers: helpers }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const products = [
  {
    model: 'Mask GPM-05',
    production: 'ON SALE',
    forPlayer:
      'For the roles of shoujo or older sister(onēsan) For player whose height is over 155cm',
    url: 'https://static.wixstatic.com/media/648814_6fc2f9baa95d41b796b9af0ca378da1e~mv2.jpg/v1/fill/w_429,h_643,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/648814_6fc2f9baa95d41b796b9af0ca378da1e~mv2.jpg',
    imgUrl: [
      {
        name: 'saber',
        url: 'https://static.wixstatic.com/media/648814_6fc2f9baa95d41b796b9af0ca378da1e~mv2.jpg/v1/fill/w_429,h_643,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/648814_6fc2f9baa95d41b796b9af0ca378da1e~mv2.jpg',
      },
      {
        name: 'saber',
        url: 'https://static.wixstatic.com/media/648814_f53296ca4d8d4ba5945fd654a3900fbc~mv2.jpg/v1/fill/w_429,h_643,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/648814_f53296ca4d8d4ba5945fd654a3900fbc~mv2.jpg',
      },
      {
        name: 'acher',
        url: 'https://static.wixstatic.com/media/648814_64941718023e4268a2653f2a3854e25d~mv2.jpg/v1/fill/w_501,h_334,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/648814_64941718023e4268a2653f2a3854e25d~mv2.jpg',
      },
      {
        name: 'assion',
        url: 'https://static.wixstatic.com/media/648814_6fc2f9baa95d41b796b9af0ca378da1e~mv2.jpg/v1/fill/w_429,h_643,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/648814_6fc2f9baa95d41b796b9af0ca378da1e~mv2.jpg',
      },
      {
        name: 'assion',
        url: 'https://static.wixstatic.com/media/648814_c2a696b9e2fe461299570567230c4ae1~mv2.jpg/v1/fill/w_429,h_643,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/648814_c2a696b9e2fe461299570567230c4ae1~mv2.jpg',
      },
      {
        name: 'caster',
        url: 'https://static.wixstatic.com/media/648814_4e11d1da219a4e298b40487bc5896696~mv2.jpg/v1/fill/w_429,h_643,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/648814_4e11d1da219a4e298b40487bc5896696~mv2.jpg',
      },
      {
        name: 'lancer',
        url: 'https://static.wixstatic.com/media/648814_e6a972da0c7a49189c891ed6487d6229~mv2.jpg/v1/fill/w_964,h_643,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/648814_e6a972da0c7a49189c891ed6487d6229~mv2.jpg',
      },
      {
        name: 'lancer',
        url: 'https://static.wixstatic.com/media/648814_65ee570772e14c03858d6bef8670af8d~mv2.jpg/v1/fill/w_964,h_643,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/648814_65ee570772e14c03858d6bef8670af8d~mv2.jpg',
      },
      {
        name: 'lancer',
        url: 'https://static.wixstatic.com/media/648814_10ab8b5be02f4877b81abb4cb3a26d5d~mv2.jpg/v1/fill/w_429,h_643,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/648814_10ab8b5be02f4877b81abb4cb3a26d5d~mv2.jpg',
      },
      {
        name: 'lancer',
        url: 'https://static.wixstatic.com/media/648814_da1b15d668434b158a7b60533741094f~mv2.jpg/v1/fill/w_429,h_643,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/648814_da1b15d668434b158a7b60533741094f~mv2.jpg',
      },
      {
        name: 'bascker',
        url: 'https://static.wixstatic.com/media/648814_09d964b56680444cbdcf868b4810e74e~mv2.jpg/v1/fill/w_429,h_643,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/648814_09d964b56680444cbdcf868b4810e74e~mv2.jpg',
      },
      {
        name: 'bascker',
        url: 'https://static.wixstatic.com/media/648814_43de08cb83e245dfb0b146ddc736cbe9~mv2.jpg/v1/fill/w_429,h_643,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/648814_43de08cb83e245dfb0b146ddc736cbe9~mv2.jpg',
      },
      {
        name: 'bascker',
        url: 'https://static.wixstatic.com/media/648814_dc48e3fafc0743a9a3e7a5bc7b669dd6~mv2.jpg/v1/fill/w_965,h_643,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/648814_dc48e3fafc0743a9a3e7a5bc7b669dd6~mv2.jpg',
      },
      {
        name: 'rider',
        url: 'https://static.wixstatic.com/media/648814_9456cc952a3246498ed3003b120e4742~mv2.jpg/v1/fill/w_965,h_643,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/648814_9456cc952a3246498ed3003b120e4742~mv2.jpg',
      },
      {
        name: 'rider',
        url: 'https://static.wixstatic.com/media/648814_8560234d3ad74f62832c766f4c151e28~mv2.jpg/v1/fill/w_965,h_643,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/648814_8560234d3ad74f62832c766f4c151e28~mv2.jpg'
      }
    ]
  },
]

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/goukaou', (req, res) => {
  res.render('goukaou')
})
app.get('/mask-onsale', (req, res) => {
  res.render('mask-onsale', { products })
})
app.get('/mask-offsale', (req, res) => {
  res.render('mask-offsale', { products2 })
})
app.get('/onsale-img', (req, res) => {
  res.render('onsale-img', { products: products[0] })
})
app.get('/offsale-img', (req, res) => {
  res.render('offsale-img', { products: products2[0] })
})



app.get('/zentai-suit', (req, res) => {
  // let productMap = {}
  // products3.forEach((item) => {
  //   productMap[item.id] = item
  // })
  // console.log('productMap',productMap)
  // console.log(products3)
  // const newProducts = products3.map((item, index) => {
  //   return productMap[item.id] = item
  // })
  // console.log(newProducts)
  console.log('body',req.body)
  console.log('puery',req.query)
  console.log('params',req.params)
  
  res.render('zentai-suit', { products: products3 })
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
    console.log(req.body)
    console.log('EMAIL_USERNAME', process.env.EMAIL_USERNAME)
    console.log('EMAIL_PASSWORD', process.env.EMAIL_PASSWORD)
    // let testAccount = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
      // service: 'gmail',
      host: 'smtp.gmail.com', 
      port: 587,
      secure: false,
      auth: {
        type: 'login',
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
      // from: email,
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