const express = require('express')
const router = express.Router()

const upload = require('../../../middleware/multer.js')
const { generalErrorHandler } = require('../../../middleware/error-handler.js')

const adminController = require('../../../controllers/apis/admin-controller.js')
const categoryController = require('../../../controllers/category-controller.js')
const modelController = require('../../../controllers/model-controller.js')

// 管理者登入登出路由
// router.get('/login', adminController.loginPage)
// router.post('/login', adminController.login)
// router.get('/logout', adminController.logout)

// ADMIN PRODUCT 路由
router.get('/products/create',  adminController.createProduct)
 // editProduct 路由 可以用 createProduct, getProduct 拿到資掉
router.put('/products/:productId', upload.fields([{ name: 'sampleImg', maxCount: 1 }, { name: 'imgUrl', maxCount: 5 }]),  adminController.putProduct)
router.delete('/products/:productId',  adminController.deleteProduct)
router.get('/products/:productId',  adminController.getProduct)
router.post('/products', upload.fields([{ name: 'sampleImg', maxCount: 1 }, { name: 'imgUrl', maxCount: 5 }]), adminController.postProduct)
router.get('/products', adminController.getProducts)

// ADMIN CATEGORY 路由
router.put('/categories/:categoryId',  categoryController.putCategory)
router.delete('/categories/:categoryId',  categoryController.deleteCategory)
router.get('/categories/:categoryId',  categoryController.getCategory)
router.post('/categories',  categoryController.postCategory)
router.get('/categories',  categoryController.getCategories)

// ADMIN MODELS 路由
router.put('/models/:modelId',  modelController.putModel)
router.delete('/models/:modelId',  modelController.deleteModel)
router.get('/models/:modelId',  modelController.getModel)
router.post('/models',  modelController.postModel)
router.get('/models',  modelController.getModels)
router.use('/', generalErrorHandler)

module.exports = router