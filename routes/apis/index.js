const express = require('express')
const router = express.Router()

const {
  authenticated,
  authenticatedAdmin
} = require('../../middleware/api-auth.js')
const { apiErrorHandler } = require('../../middleware/error-handler.js')

const productController = require('../../controllers/apis/product-controller.js')
const userController = require('../../controllers/apis/user-controller.js')
const admin = require('./modules/admin.js')

router.use('/admin', authenticated,
  authenticatedAdmin, admin)

// 登入才可拿資料
// router.get('/products/goukaou', authenticated, productController.getGoukaou)
// router.get('/products/mask-onsale', authenticated, productController.getMaskOnSale)
// router.get('/products/mask-offsale', authenticated, productController.getMaskOffSale)
// router.get('/products/onsale-img/:productId', authenticated, productController.getOnSaleImg)
// router.get('/products/offsale-img/:productId', authenticated, productController.getOffSaleImg)
// router.get('/products/zentai-suit', authenticated, productController.getZentaiSuit)
// router.get('/products/contact', authenticated, productController.getContact)
// router.get('/products', authenticated, productController.getHome)
// router.post('/products/contact', authenticated, productController.postContact)

// 未登入可拿資料
router.get('/products/goukaou', productController.getGoukaou)
router.get('/products/mask-onsale', productController.getMaskOnSale)
router.get('/products/mask-offsale', productController.getMaskOffSale)
router.get('/products/onsale-img/:productId', productController.getOnSaleImg)
router.get('/products/offsale-img/:productId', productController.getOffSaleImg)
router.get('/products/zentai-suit', productController.getZentaiSuit)
router.get('/products/contact', productController.getContact)
router.get('/products', productController.getHome)
router.post('/products/contact', productController.postContact)

router.post('/login', userController.login)
router.post('/register', userController.register)

router.use('/', apiErrorHandler)

module.exports = router