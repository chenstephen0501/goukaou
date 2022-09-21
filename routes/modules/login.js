const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('admin/login')
}),

router.post('/', (req, res) => {
  console.log(req.body)
  res.render('admin/products')
})

module.exports = router