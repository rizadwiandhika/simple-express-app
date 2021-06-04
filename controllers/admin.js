const querystring = require('querystring')

/**
 * * Penanganan error defaultnya: diteruskan ke error middleware di app.js
 * * Kalo penanganan error mau spesifik, sertakan callback kedua
 */
const asynchHandler = require('../utilities/asyncHandler')

const Product = require('../models/product')

exports.getEditProduct = asynchHandler(async (req, res, next) => {
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
})

exports.postEditProduct = asynchHandler(async (req, res, next) => {
  const editedProduct = req.body
  const editResult = await Product.editProduct(editedProduct)
  console.log('edit result:', editResult)

  res.redirect('/admin/products')
})

exports.getProducts = asynchHandler(
  async (req, res, next) => {
    const products = await Product.fetchAll()

    res.render(`${global.viewEngine}/admin/products`, {
      pageTitle: 'Admin Products',
      path: '/admin/products',
      products: products
    })
  },
  (err, req, res, next) => {
    res.send(err.message)
  }
)

exports.getAddProduct = (req, res, next) => {
  res.render(`${global.viewEngine}/admin/edit-product`, {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    successSave: typeof req.query.saveSuccess === 'undefined' || saveSuccess
  })
}

exports.postAddProduct = asynchHandler(async (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: +req.body.price,
    description: req.body.description
  })

  const saveSuccess = await product.save()
  const query = querystring.stringify({ saveSuccess: saveSuccess })
  saveSuccess ? res.redirect('/') : res.redirect('/admin/add-product?' + query)
})

exports.postDeleteProduct = asynchHandler(async (req, res, next) => {
  const { productId } = req.body

  await Product.deleteProductById(productId)
  res.redirect('/admin/products')
})
