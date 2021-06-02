const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

router.get('/edit-product/:productId', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product', adminController.postDeleteProduct)

router.get('/products', adminController.getProducts)

router.get('/add-product', adminController.getAddProduct)
router.post('/add-product', adminController.postAddProduct)

module.exports = router
