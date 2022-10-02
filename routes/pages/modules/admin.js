const express = require('express')
const router = express.Router()

const upload = require('../../../middleware/multer.js')
const { authenticatedAdmin } = require('../../../middleware/auth.js')
const adminController = require('../../../controllers/admin-controller.js')
const categoryController = require('../../../controllers/category-controller.js')
const modelController = require('../../../controllers/model-controller.js')

// 管理者登入登出路由
router.get('/login', adminController.loginPage)
router.post('/login', adminController.login)
router.get('/logout', adminController.logout)
// ADMIN PRODUCT 路由
router.get('/products/create', authenticatedAdmin, adminController.createProduct)
router.get('/products/:productId/edit', authenticatedAdmin, adminController.editProduct)
router.put('/products/:productId', upload.fields([{ name: 'sampleImg', maxCount: 1 }, { name: 'imgUrl', maxCount: 5 }]), authenticatedAdmin, adminController.putProduct)
router.delete('/products/:productId', authenticatedAdmin, adminController.deleteProduct)
router.get('/products/:productId', authenticatedAdmin, adminController.getProduct)
router.post('/products', upload.fields([{ name: 'sampleImg', maxCount: 1 }, { name: 'imgUrl', maxCount: 5 }]), authenticatedAdmin, adminController.postProduct)
router.get('/products', authenticatedAdmin, adminController.getProducts)

// ADMIN CATEGORY 路由
router.put('/categories/:categoryId', authenticatedAdmin, categoryController.putCategory)
router.delete('/categories/:categoryId', authenticatedAdmin, categoryController.deleteCategory)
router.get('/categories/:categoryId', authenticatedAdmin, categoryController.getCategory)
router.post('/categories', authenticatedAdmin, categoryController.postCategory)
router.get('/categories', authenticatedAdmin, categoryController.getCategories)

// ADMIN MODELS 路由
router.put('/models/:modelId', authenticatedAdmin, modelController.putModel)
router.delete('/models/:modelId', authenticatedAdmin, modelController.deleteModel)
router.get('/models/:modelId', authenticatedAdmin, modelController.getModel)
router.post('/models', authenticatedAdmin, modelController.postModel)
router.get('/models', authenticatedAdmin, modelController.getModels)

module.exports = router