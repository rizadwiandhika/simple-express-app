const Product = require('../models/product')

exports.getIndex = (req, res, next) => {
  ;(async function () {
    const products = await Product.fetchAll()
    res.render(`${global.viewEngine}/shop/index`, {
      pageTitle: 'Shop',
      path: '/',
      products: products
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

exports.getCart = (req, res, next) => {
  res.render(`${global.viewEngine}/shop/cart`, {
    pageTitle: 'Cart',
    path: '/cart'
  })
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
