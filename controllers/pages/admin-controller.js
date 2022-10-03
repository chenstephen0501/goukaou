const passport = require('../../config/passport.js')

const adminServices = require('../../services/admin-services.js')

const adminController = {
  //  ADMIN PRODUCT 路由
  loginPage: (req, res) => {
    res.render('admin/login')
  },
  login: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/admin/login',
    failureFlash: true

  }),
  logout: (req, res, next) => {
    req.flash('success_messages', '成功登出')
    req.logout()
    res.redirect('/admin/login')
  },
  getProducts: (req, res,next) => {
    adminServices.getProducts(req, (err, data) => err ? next(err) : res.render('admin/products', data))
  },
  createProduct: (req, res, next) => {
    adminServices.createProduct(req, (err, data) => err ? next(err) : res.render('admin/create-product', data))
  },
  postProduct: (req, res, next) => {
    adminServices.postProduct(req, (err, data) => {
      if (err) next(err)
      req.session.createData = data
      req.flash('success_messages', '成功新增產品。')
       return res.redirect('/admin/products')
    })
  },
  getProduct: (req, res, next) => {
    adminServices.getProduct(req, (err, data) => err ? next(err) : res.render('admin/product', data))
  },
  editProduct: (req, res, next) => {
    adminServices.editProduct(req, (err, data) => err ? next(err) : res.render('admin/edit-product', data))
  },
  putProduct: (req, res, next) => {
    adminServices.putProduct(req, (err, data) => {
      if (err) return next(err)
      req.session.updateData = data
      req.flash('success_messages', '成功編輯產品。')
      return res.redirect('/admin/products')
    })
  },
  deleteProduct: (req, res, next) => {
    adminServices.deleteProduct(req, (err, data) => {
      if (err) return next(err)
      req.session.deleteData = data
      return res.redirect('/admin/products')
    })
  }
}

module.exports = adminController