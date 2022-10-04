const passport = require('../../config/passport.js')

const express = require('express')
const router = express.Router()

const { apiErrorHandler } = require('../../middleware/error-handler.js')

const productController = require('../../controllers/apis/product-controller.js')
const userController = require('../../controllers/apis/user-controller.js')
const admin = require('./modules/admin.js')

router.use('/admin', admin)

router.get('/products/goukaou', productController.getGoukaou)
router.get('/products/mask-onsale', productController.getMaskOnSale)
router.get('/products/mask-offsale', productController.getMaskOffSale)
router.get('/products/onsale-img/:productId', productController.getOnSaleImg)
router.get('/products/offsale-img/:productId', productController.getOffSaleImg)
router.get('/products/zentai-suit', productController.getZentaiSuit)
router.get('/products/contact', productController.getContact)
router.get('/products', productController.getHome)
router.post('/products/contact', productController.postContact)

// router.post('/login', userController.login)
router.post('/login', passport.authenticate('local', { session: false }), userController.login)
router.post('/register', userController.register)
router.get('/logout', userController.logout)

router.use('/', apiErrorHandler)

module.exports = router