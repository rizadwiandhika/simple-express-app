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
  res.render(`${global.viewEngine}/admin/add-product`, {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    successSave: req.query.saveSuccess
  })
}

exports.postAddProduct = (req, res, next) => {
  /* 
  Dari course, dia gak async gini (gak nunggu writeFile nya / "product.save()").
  Disini gua buat jadi async biar lebih pasti aja sama gua mau dapetin 
  status keberhasilan writeFile nya
  */
  ;(async function () {
    const product = new Product({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      description: req.body.description
    })
    const saveSuccess = await product.save()
    const query = querystring.stringify({ saveSuccess: saveSuccess })
    saveSuccess
      ? res.redirect('/')
      : res.redirect('/admin/add-product?' + query)
  })()
}
