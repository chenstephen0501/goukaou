module.exports = {
  generalErrorHandler (err, req, res, next) {
    console.log('err',err)
    if (err.name === 'CastError') {
      req.flash('error_messages', 'Error: 找不到這個產品!')
    } else {
      if (err instanceof Error) {
        req.flash('error_messages', `${err.name}: ${err.message}`)
      } else {
        req.flash('error_messages', `${err}`)
      }
    }
    res.redirect('back')
    next()
  }
}