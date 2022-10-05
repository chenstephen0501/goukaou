const getSkip = (page = 1, limit = 8) => ((page - 1) * limit)

const getPagenation = (page = 1, limit = 8, total = 50) => {
  const totalPage = Math.ceil(total / limit)
  const pageCount = 10
  const minusPage = 4
  const currentPage = page < 1 ? 1 : page > totalPage ? totalPage : page
  const prev = currentPage - 1 ? currentPage - 1 : 1
  const next = currentPage + 1 ? currentPage + 1 : totalPage
  const prevTenPage = currentPage - 10 > 0 ? currentPage - 10 : false
  const nextTenPage = currentPage + 10 <= totalPage ? currentPage + 10 : false
  let pages
  if (total <= limit * pageCount) {
    pages= Array.from({ length: totalPage }, (_, index) => {
      return index + 1
    })
  } else {
    pages = Array.from({ length: pageCount }, (_, index) => {
      if (currentPage <= pageCount) {
        return index + 1
      } else {
        let newCurrentPage = currentPage - minusPage
        if (currentPage + pageCount <= totalPage) {
          return newCurrentPage + index + 1
        } else {
          newCurrentPage = totalPage - pageCount
          return newCurrentPage + index + 1
        }
      }
    })
  }
  return {
    totalPage,
    pages,
    prev,
    next,
    currentPage,
    nextTenPage,
    prevTenPage
  }
}

module.exports = {
  getSkip,
  getPagenation
}