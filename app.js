const express = require('express')
const exphbs = require('express-handlebars')
const products2 = require('./products2.json')
const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

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
app.get('/contact',  (req, res) => {
  res.render('contact')
})

app.listen(port, () => {
  console.log(`The GOUKAOU web is running on http://localhost:${port}`)
})