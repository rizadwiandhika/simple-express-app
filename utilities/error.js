const BAD_RESPONSE = 400
const NOT_FOUND = 404
const GENERIC_ERROR_RESPONSE = 500

class GeneralError extends Error {
  constructor(name) {
    super()
    this.name = name
    this.message = name
  }

  getCode() {
    if (this instanceof BadRequest) return BAD_RESPONSE
    if (this instanceof NotFound) return NOT_FOUND
    return GENERIC_ERROR_RESPONSE
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}

const asyncErrorHandler = async (ErrorClass = Error, asyncCallback) => {
  try {
    /* Pake await biar bener-bener dijalanin (gak cuma dibaca sebagai Promise)
    sehingga catch error bisa menangkap error */
    const result = await asyncCallback()
    return result
  } catch (error) {
    console.log('err message (Error.js)', error.message)
    throw new ErrorClass(error.message)
  }
}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  asyncErrorHandler
}
