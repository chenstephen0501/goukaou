const getSkip = (page = 1, limit = 8) => ((page - 1) * limit)

const getPagenation = (page = 1, limit = 8, total = 50) => {
  const totalPage = Math.ceil(total / limit)
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1)
  const currentPage = page < 1 ? 1 : page > totalPage ? totalPage : page
  const prev = currentPage - 1 ? currentPage - 1 : 1
  const next = currentPage + 1 ? currentPage + 1 : totalPage
  return {
    totalPage,
    pages,
    prev,
    next,
    currentPage
  }
}

module.exports = {
  getSkip,
  getPagenation
}