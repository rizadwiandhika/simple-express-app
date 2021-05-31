/* A single entity for product */

const fs = require('fs')
const path = require('path')

const { rootDirectory } = require('../utilities/path')

module.exports = class Product {
  constructor({ title, imageUrl, price, description }) {
    this.title = title
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
  }

  static fetchAll() {
    const dataPath = path.join(rootDirectory, 'data', 'products.json')
    return Product.#readData(dataPath)
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
    const dataPath = path.join(rootDirectory, 'data', 'products.json')
    const data = await Product.#readData(dataPath)

    data.push(this)
    const saveSuccess = await Product.#writeData(dataPath, data)
    return saveSuccess
  }

  static #readData(dataPath) {
    return new Promise((response, reject) => {
      fs.readFile(dataPath, (error, fileContent) => {
        const fileEmpty = fileContent.length == 0
        response(error || fileEmpty ? [] : JSON.parse(fileContent))
      })
    })
  }

  static #writeData(dataPath, products) {
    return new Promise((response, reject) => {
      fs.writeFile(dataPath, JSON.stringify(products), (error) => {
        response(error == null)
      })
    })
  }
}
