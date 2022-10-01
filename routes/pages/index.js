const express = require('express')
const router = express.Router()
// 會員驗證，暫時關閉
// const { authenticated } = require('../middleware/auth.js')
const { generalErrorHandler } = require('../../middleware/error-handler.js')

const userController = require('../../controllers/user-controller.js')
const productController = require('../../controllers/product-controller.js')

// admin
const admin = require('./modules/admin.js')

router.use('/admin', admin)

router.get('/login', userController.loginPage)
router.post('/login', userController.login)
router.get('/register', userController.registerPage)
router.post('/register', userController.register)
router.get('/logout', userController.logout)

// PRODUCT 暫時先保留，未來根據網站管理所有人再做調整
// router.get('/products/goukaou', authenticated, productController.getGoukaou)
// router.get('/products/mask-onsale', authenticated, productController.getMaskOnSale)
// router.get('/products/mask-offsale', authenticated, productController.getMaskOffSale)
// router.get('/products/onsale-img/:productId', authenticated, productController.getOnSaleImg)
// router.get('/products/offsale-img/:productId', authenticated, productController.getOffSaleImg)
// router.get('/products/zentai-suit', authenticated, productController.getZentaiSuit)
// router.get('/products/contact', authenticated, productController.getContact)
// router.post('/products/contact', authenticated, productController.postContact)
// router.get('/products', authenticated, productController.getHome)

router.get('/products/goukaou', productController.getGoukaou)
router.get('/products/mask-onsale', productController.getMaskOnSale)
router.get('/products/mask-offsale', productController.getMaskOffSale)
router.get('/products/onsale-img/:productId', productController.getOnSaleImg)
router.get('/products/offsale-img/:productId', productController.getOffSaleImg)
router.get('/products/zentai-suit', productController.getZentaiSuit)
router.get('/products/contact', productController.getContact)
router.post('/products/contact', productController.postContact)
router.get('/products', productController.getHome)

router.use('/', (req, res) => res.redirect('/products'))
router.use('/', generalErrorHandler)
module.exports = router