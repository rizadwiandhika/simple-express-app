exports.get404 = (req, res, next) => {
  const NOT_FOUND = 404
  res.status(NOT_FOUND).render(`${global.viewEngine}/404`, {
    pageTitle: 'Page not Found',
    path: '/404'
  })
}
