const dayjs = require('dayjs')

module.exports = {
  currentYear: () => dayjs().year(),
  ifCond: (a, b, options) => {
    if (typeof a === 'object') {
      a = a.toString()
    }
    if (typeof b === 'object') {
      b = b.toString()
    }
    if (typeof a === 'boolean') {
      a = a.toString()
    }
    if (typeof b === 'boolean') {
      b = b.toString()
    }
    if (a === b) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  }
}