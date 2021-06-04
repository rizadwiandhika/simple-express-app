const asycnHandler = require('../utilities/asyncHandler')

const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getIndex = asycnHandler(async (req, res, next) => {
  const products = await Product.fetchAll()
  res.render(`${global.viewEngine}/shop/index`, {
    pageTitle: 'Shop',
    path: '/',
    products: products,
    test: { nama: 'riza' }
  })
})

exports.getProducts = asycnHandler(async (req, res, next) => {
  const products = await Product.fetchAll()

  res.render(`${global.viewEngine}/shop/product-list`, {
    pageTitle: 'All Products',
    path: '/products',
    products: products
  })
})

exports.getProductWithId = asycnHandler(async (req, res, next) => {
  const productId = req.params.productId // Dari URL "/product/:productId"
  const product = await Product.findById(productId)

  res.render(`${global.viewEngine}/shop/product-detail`, {
    pageTitle: product.title,
    path: '/products', // Biar nav 'product' tetep active
    product: product
  })
})

exports.getCart = asycnHandler(async (req, res, next) => {
  const cart = await Cart.fetchAll()
  const products = await Product.fetchAll()
  const cartProducts = []

  for (const product of products) {
    const productInCart = cart.products.find(({ id }) => id === product.id)
    if (!productInCart) continue

    cartProducts.push({ ...product, qty: productInCart.qty })
  }

  res.render(`${global.viewEngine}/shop/cart`, {
    pageTitle: 'Cart',
    path: '/cart',
    products: cartProducts
  })
})

exports.postCart = (req, res, next) => {
  const { productId, productPrice } = req.body
  Cart.addProduct({ productId: productId, productPrice: +productPrice })
  res.redirect('/cart')
}

exports.postCartDeleteProduct = asycnHandler(async (req, res, next) => {
  /* Cleaner way, bener2 cuma menerima id dari client. Jangan sama price nya */
  const { id } = req.body
  const product = await Product.findById(id)

  if (!product) return res.redirect('/cart')

  await Cart.deleteProduct(product)
  res.redirect('/cart')
})

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
