const Category = require('../../models/category.js')

const categoryServices = require('../../services/categories-services.js')

const categoryController = {
  getCategories: (req, res) => {
    categoryServices.getCategories(req, (err, data) => err ? next(err) : res.render('admin/categories', data))

  },
  postCategory: (req, res, next) => {
    categoryServices.postCategory(req, (err, data) => {
      if (err) return next(err)
      req.session.createCategory = data
      req.flash('success_messages', '新增類別成功。')
      return res.redirect('/admin/categories')
    })
  },
  getCategory: (req, res, next) => {
    categoryServices.getCategory(req, (err, data) => err ? next(err) : res.render('admin/categories', data))
  },
  putCategory: (req, res, next) => {
    categoryServices.putCategory(req, (err, data) => { 
      if (err) return next(err)
      req.session.updateCategory = data
      req.flash('success_messages', '編輯類別成功。')
      return res.redirect('/admin/categories') 
    })
  },
  deleteCategory: (req, res, next) => {
    categoryServices.deleteCategory(req, (err, data) => {
      if (err) return next(err)
      req.session.deleteCategory = data
      return res.redirect('/admin/categories')
    })
  }
}

module.exports = categoryController