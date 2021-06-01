const express = require('express')

const shopController = require('../controllers/shop')

const router = express.Router()

/*
! PERHATIKAN URUTAN
*/

router.get('/', shopController.getIndex)

router.get('/products', shopController.getProducts)

/* 
* DYNAMIC URL
* Nanti URL /product/<whatever> -> value akan disimpan di variable "productId"
! Urutan penting diperhatikan 
! Kalo ada misal .get('/product/delete') dibawah .get('/product/:productId')
! MAKA .get('/product/delete') gak akan pernah DICAPAI
*/
router.get('/product/:productId', shopController.getProductWithId)

router.get('/cart', shopController.getCart)
router.post('/cart', shopController.postCart)

router.get('/orders', shopController.getOrders)

router.get('/checkout', shopController.getCheckout)

module.exports = router
