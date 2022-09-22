const express = require('express')
const router = express.Router()

// admin
const login = require('./modules/login.js')
const products = require('./modules/products.js')
const categories = require('./modules/categories.js')
const models = require('./modules/models.js')

const home = require('./modules/home.js')
const goukaou = require('./modules/goukaou.js')
const maskOnSale = require('./modules/mask-onsale.js')
const maskOffSale = require('./modules/mask-offsale.js')
const onSaleImg = require('./modules/onsale-img.js')
const offSaleImg = require('./modules/offsale-img.js')
const zenTaiSuit = require('./modules/zentai-suit.js')
const contact = require('./modules/contact.js')
const register = require('./modules/register.js')

// use admin 
router.use('/admin/products', products)
router.use('/admin/categories', categories)
router.use('/admin/models', models)

router.use('/goukaou', goukaou)
router.use('/mask-onsale', maskOnSale)
router.use('/mask-offsale', maskOffSale)
router.use('/onsale-img', onSaleImg)
router.use('/offsale-img', offSaleImg)
router.use('/zentai-suit', zenTaiSuit)
router.use('/contact', contact)
router.use('/register', register)
router.use('/login', login)

router.use('/', home)
module.exports = router
