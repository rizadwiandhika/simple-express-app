const fs = require('fs')
const path = require('path')
const { rootDirectory } = require('../utilities/path')

module.exports = class Cart {
  static #dataPath = path.join(rootDirectory, 'data', 'cart.json')

  static async addProduct({ productId, productPrice }) {
    const cart = await Cart.#readData()

    cart.totalPrice += productPrice

    const NOT_EXIST = -1
    const productIndex = cart.products.findIndex(({ id }) => id === productId)
    productIndex == NOT_EXIST
      ? cart.products.push({ id: productId, qty: 1 })
      : cart.products[productIndex].qty++

    Cart.#writeData(cart)
  }

  static async deleteProduct({ id: productId, price: productPrice }) {
    const cart = await Cart.#readData()

    const deletedProduct = cart.products.find(({ id }) => id === productId)
    const updatedCart = cart.products.filter(({ id }) => id !== productId)

    updatedCart.totalPrice -= productPrice * deletedProduct.qty

    Cart.#writeData(updatedCart)
  }

  static #readData() {
    return new Promise((response, reject) => {
      fs.readFile(Cart.#dataPath, (error, fileContent) => {
        const fileEmpty = fileContent && fileContent.length == 0
        const dafultCart = { products: [], totalPrice: 0 }

        response(error || fileEmpty ? dafultCart : JSON.parse(fileContent))
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
