const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getIndex = (req, res, next) => {
  ;(async function () {
    const products = await Product.fetchAll()
    res.render(`${global.viewEngine}/shop/index`, {
      pageTitle: 'Shop',
      path: '/',
      products: products,
      test: { nama: 'riza' }
    })
  })()
}

exports.getProducts = (req, res, next) => {
  ;(async function () {
    const products = await Product.fetchAll()

    res.render(`${global.viewEngine}/shop/product-list`, {
      pageTitle: 'All Products',
      path: '/products',
      products: products
    })
  })()
}

exports.getProductWithId = (req, res, next) => {
  ;(async function () {
    const productId = req.params.productId // Dari URL "/product/:productId"
    const product = await Product.findById(productId)

    res.render(`${global.viewEngine}/shop/product-detail`, {
      pageTitle: product.title,
      path: '/products', // Biar nav 'product' tetep active
      product: product
    })
  })()
}

exports.getCart = (req, res, next) => {
  res.render(`${global.viewEngine}/shop/cart`, {
    pageTitle: 'Cart',
    path: '/cart'
  })
}

exports.postCart = (req, res, next) => {
  const { productId, productPrice } = req.body
  Cart.addProduct({ productId: productId, productPrice: +productPrice })
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render(`${global.viewEngine}/shop/orders`, {
    pageTitle: 'Orders',
    path: '/orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render(`${global.viewEngine}/shop/checkout`, {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}
