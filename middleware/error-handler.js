module.exports = {
  generalErrorHandler (err, req, res, next) {
    if (err.name === 'CastError') {
      req.flash('error_messages', `${err.name}: 沒有找到ID為 ${err.value}的資源。`)
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