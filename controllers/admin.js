const querystring = require('querystring')

const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  ;(async function () {
    const products = await Product.fetchAll()
    res.render(`${global.viewEngine}/admin/products`, {
      pageTitle: 'Admin Products',
      path: '/admin/products',
      products: products
    })
  })()
}

exports.getAddProduct = (req, res, next) => {
  res.render(`${global.viewEngine}/admin/edit-product`, {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    successSave: typeof req.query.saveSuccess === 'undefined' || saveSuccess
  })
}

exports.postAddProduct = (req, res, next) => {
  ;(async function () {
    const product = new Product({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: +req.body.price,
      description: req.body.description
    })

    const saveSuccess = await product.save()
    const query = querystring.stringify({ saveSuccess: saveSuccess })
    saveSuccess
      ? res.redirect('/')
      : res.redirect('/admin/add-product?' + query)
  })()
}

exports.getEditProduct = (req, res, next) => {
  ;(async function () {
    const editMode = req.query.edit === 'true'
    const productId = req.params.productId
    const product = await Product.findById(productId)

    if (!product) return res.redirect('/admin/products')

    res.render(`${global.viewEngine}/admin/edit-product`, {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      successSave: typeof req.query.saveSuccess === 'undefined' || saveSuccess,
      editing: editMode,
      product: product
    })
  })()
}

exports.postEditProduct = (req, res, next) => {
  ;(async function () {
    const editedProduct = req.body
    await Product.editProduct(editedProduct)
    res.redirect('/admin/products')
  })()
}

exports.postDeleteProduct = (req, res, next) => {
  ;(async function () {
    const { productId } = req.params
    await Product.deleteProduct(productId)
    res.redirect('/admin/products')
  })()
}
