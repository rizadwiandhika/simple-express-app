/* A single entity for product */

const fs = require('fs')
const path = require('path')

const Cart = require('./cart')

const { rootDirectory } = require('../utilities/path')

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
    return Product.#readData()
  }

  /* 
  * Solusi fecthAll() dari course:
  static fetchAll(callback) {
    const dataPath = path.join(rootDirectory, 'data', 'products.json')
    fs.readFile(dataPath, (error, fileContent) => {
      callback(error ? [] : JSON.parse(fileContent))
    })
  }

  * Nanti di controllers products:
    exports.getProducts = (req, res, next) => {
      Product.fetchAll((products) => {
        res.render(`${global.viewEngine}/shop`, {
          pageTitle: 'Shop',
          products: products,
          path: '/'
        })
      })
    }
  */
  async save() {
    // ? Membaca file yang baik
    const data = await Product.#readData()

    data.push(this)
    const saveSuccess = await Product.#writeData(data)
    return saveSuccess
  }

  static async editProduct(editedProduct) {
    if (typeof editedProduct.price !== 'number') {
      editedProduct.price = +editedProduct.price
    }

    const data = await Product.#readData()

    const productIndex = data.findIndex(({ id }) => id === editedProduct.id)
    if (productIndex < 0) return

    data[productIndex] = editedProduct
    Product.#writeData(data)
  }

  static async deleteProductById(productId) {
    const data = await Product.#readData()
    const updatedData = data.filter(({ id }) => id !== productId)

    const changes = data.length - updatedData.length > 0
    if (!changes) return

    const deletedProduct = data.find(({ id }) => id === productId)

    Cart.deleteProduct(deletedProduct)
    Product.#writeData(updatedData)
  }

  static async findById(productId) {
    const data = await Product.#readData()
    return data.find(({ id }) => id === productId)
  }

  static #readData() {
    return new Promise((response, reject) => {
      fs.readFile(Product.#dataPath, (error, fileContent) => {
        const fileEmpty = fileContent && fileContent.length == 0

        response(error || fileEmpty ? [] : JSON.parse(fileContent))
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
