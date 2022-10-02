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
  },
  apiErrorHandler (err, req, res, next) {
    if (err instanceof Error) {
      res.status(err.status || 500).json({
        status: 'error',
        message: `${err.name}: ${err.message}`
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: `${err}`
      })
    }
    next()
  }
}