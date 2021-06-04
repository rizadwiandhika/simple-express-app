/* middleware nya itu async function */
module.exports = (asyncMiddleware, customHanlder) => {
  /* Versi readable -> customHanlders harus fungsi bukan ...customHanlders */
  return async (req, res, next) => {
    try {
      await asyncMiddleware(req, res, next)
    } catch (error) {
      console.log('(asycnHandler.js) Error message', error.message)

      typeof customHanlder === 'function'
        ? customHanlder(error, req, res, next)
        : next(error)
    }
  }

  /** Versi lebih singkat
   * Ketika async middleware ini throw error maka next akan dijalankan
   * Ingat catch itu menerima function yang akan dijalankan ketika terjadi reject / error
   */
  /* return (req, res, next) => {
    middleware(req, res, next).catch(next)
  } */
}
