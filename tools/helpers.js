module.exports = {
  ifCond : (a, b, options) => {
    if (a.toString() === b.toString()) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  }
}