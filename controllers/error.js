const errors = require('../utilities/error')

const NOT_FOUND = 404
const GENERIC_ERROR_RESPONSE = 500

exports.get404 = (req, res, next) => {
  res.status(NOT_FOUND).render(`${global.viewEngine}/404`, {
    pageTitle: 'Page not Found',
    path: '/404'
  })
}

exports.handleError = (err, req, res, next) => {
  if (err instanceof errors.GeneralError) {
    return res
      .status(err.getCode())
      .send(
        `Something went wrong :( ${err.message} \nInstace: ${err.constructor.name}`
      )
  }

  // next()
  res.status(GENERIC_ERROR_RESPONSE).send('Unknown error occurs: ' + err)
}
