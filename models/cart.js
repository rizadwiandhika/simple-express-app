const fs = require('fs')
const path = require('path')

const { rootDirectory } = require('../utilities/path')
const {
  asyncErrorHandler,
  GeneralError,
  NotFound,
  BadRequest
} = require('../utilities/error')

module.exports = class Cart {
  static #dataPath = path.join(rootDirectory, 'data', 'cart.json')

  static fetchAll() {
    return asyncErrorHandler(BadRequest, Cart.#readData)
  }

  static addProduct({ productId, productPrice }) {
    return asyncErrorHandler(BadRequest, async () => {
      const cart = await Cart.#readData()

      cart.totalPrice += +productPrice
      cart.totalPrice = +cart.totalPrice.toFixed(2)

      const NOT_EXIST = -1
      const productIndex = cart.products.findIndex(({ id }) => id === productId)

      productIndex == NOT_EXIST
        ? cart.products.push({ id: productId, qty: 1 })
        : cart.products[productIndex].qty++

      Cart.#writeData(cart)
    })
  }

  static deleteProduct({ id: productId, price: productPrice }) {
    return asyncErrorHandler(BadRequest, async () => {
      const cart = await Cart.#readData()

      const deletedProduct = cart.products.find(({ id }) => id === productId)

      if (!deletedProduct) return

      cart.products = cart.products.filter(({ id }) => id !== productId)

      cart.totalPrice -= productPrice * deletedProduct.qty
      cart.totalPrice = +cart.totalPrice.toFixed(2)

      return Cart.#writeData(cart)
    })
  }

  static #readData() {
    return new Promise((response, reject) => {
      fs.readFile(Cart.#dataPath, (error, fileContent) => {
        try {
          const dataObject = JSON.parse(fileContent)
          response(dataObject)
        } catch (error) {
          response({ products: [], totalPrice: 0 })
        }
      })
    })
  }

  static #writeData(products) {
    return new Promise((response, reject) => {
      fs.writeFile(Cart.#dataPath, JSON.stringify(products), (error) => {
        response(error == null)
      })
    })
  }
}
