/* A single entity for product */

const fs = require('fs')
const path = require('path')

const { rootDirectory } = require('../utilities/path')

module.exports = class Product {
  static #dataPath = path.join(rootDirectory, 'data', 'products.json')

  constructor({ title, imageUrl, price, description }) {
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
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
    this.id = Math.random().toString()
    const data = await Product.#readData()

    data.push(this)
    const saveSuccess = await Product.#writeData(data)
    return saveSuccess
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
