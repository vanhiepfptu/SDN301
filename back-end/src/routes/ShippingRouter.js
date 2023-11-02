const express = require('express')
const router = express.Router()
const ShippingController = require('../controllers/ShippingController')
const { validateCreateProduct } = require('../validation/ProductValidation');
const { shipperMiddleware } = require('../middlewares/AdminMiddleware');
router.put('/startReceiveOrder', shipperMiddleware, ShippingController.startReceiveOrder);
router.put('/successDeliveryOrder', shipperMiddleware, ShippingController.successDeliveryOrder);
router.put('/failedDeliveryOrder', shipperMiddleware, ShippingController.failedDeliveryOrder);
router.get('/getAllOrder', shipperMiddleware, ShippingController.getAllOrder)
router.get('/getDetail/:id', shipperMiddleware, ShippingController.getDetailOrder)
router.put('/returnOrder', shipperMiddleware, ShippingController.returnOrder)
router.get('/getAllByAccount', shipperMiddleware, ShippingController.getAllOrderSuccessByShipping)
module.exports = router