const express = require('express')
const router = express.Router()

const { authenticated, authenticatedAdmin } = require('../middleware/auth.js')

// admin
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
const logout = require('./modules/logout.js')
const login = require('./modules/login.js')

// admin 
router.use('/admin/products', authenticatedAdmin, products)
router.use('/admin/categories', authenticatedAdmin, categories)
router.use('/admin/models', authenticatedAdmin, models)

router.use('/goukaou', authenticated, goukaou)
router.use('/mask-onsale', authenticated, maskOnSale)
router.use('/mask-offsale', authenticated, maskOffSale)
router.use('/onsale-img', authenticated, onSaleImg)
router.use('/offsale-img', authenticated, offSaleImg)
router.use('/zentai-suit', authenticated,zenTaiSuit)
router.use('/contact', authenticated, contact)
router.use('/logout', logout)
router.use('/register', register)
router.use('/login', login)
router.use('/', authenticated, home)

module.exports = router
