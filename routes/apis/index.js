const express = require('express')
const router = express.Router()

// const { authenticated } = require('../../middleware/auth.js')

const productController = require('../../controllers/apis/product-controller.js')

router.get('/products/goukaou', productController.getGoukaou)
router.get('/products/mask-onsale', productController.getMaskOnSale)
router.get('/products/mask-offsale', productController.getMaskOffSale)
router.get('/products/onsale-img/:productId', productController.getOnSaleImg)
router.get('/products/offsale-img/:productId', productController.getOffSaleImg)
router.get('/products/zentai-suit', productController.getZentaiSuit)
router.get('/products/contact', productController.getContact)
router.get('/products', productController.getHome)
router.post('/products/contact', productController.postContact)

module.exports = router