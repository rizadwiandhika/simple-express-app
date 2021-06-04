/* A single entity for product */

const fs = require('fs')
const path = require('path')

const Cart = require('./cart')

const { rootDirectory } = require('../utilities/path')
const {
  asyncErrorHandler,
  GeneralError,
  NotFound,
  BadRequest
} = require('../utilities/error')

module.exports = class Product {
  static #dataPath = path.join(rootDirectory, 'data', 'products.json')

  constructor({ title, imageUrl, price, description }) {
    this.id = Math.random().toString()
    this.title = title
    this.imageUrl = imageUrl
    this.price = typeof price !== 'number' ? +price : price
    this.description = description
  }

  static fetchAll() {
    return asyncErrorHandler(BadRequest, Product.#readData)
  }

  save() {
    return asyncErrorHandler(BadRequest, async () => {
      const data = await Product.#readData()
      data.push(this)
      const saveSuccess = await Product.#writeData(data)
      return saveSuccess
    })
  }

  static editProduct(editedProduct) {
    return asyncErrorHandler(BadRequest, async () => {
      const data = await Product.#readData()
      const productIndex = data.findIndex(({ id }) => id === editedProduct.id)

      if (productIndex < 0) return

      data[productIndex] = editedProduct
      editedProduct.price = +editedProduct.price
      return Product.#writeData(data)
    })
  }

  static deleteProductById(productId) {
    return asyncErrorHandler(BadRequest, async () => {
      const data = await Product.#readData()
      const updatedData = data.filter(({ id }) => id !== productId)

      const changes = data.length - updatedData.length > 0

      if (!changes) return

      const deletedProduct = data.find(({ id }) => id === productId)

      Cart.deleteProduct(deletedProduct)
      Product.#writeData(updatedData)
    })
  }

  static findById(productId) {
    return asyncErrorHandler(BadRequest, async () => {
      const data = await Product.#readData()
      return data.find(({ id }) => id === productId)
    })
  }

  static #readData() {
    return new Promise((response, reject) => {
      fs.readFile(Product.#dataPath, (error, fileContent) => {
        try {
          const dataObject = JSON.parse(fileContent)
          response(dataObject)
        } catch (err) {
          response([])
        }
      })
    })
  }

  static #writeData(products) {
    return new Promise((response, reject) => {
      fs.writeFile(Product.#dataPath, JSON.stringify(products), (error) => {
        response(error == null)
      })
    })
  }
}
