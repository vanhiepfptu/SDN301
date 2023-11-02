const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')
const { validateCreateProduct } = require('../validation/ProductValidation');
const { auth, adminMiddleware, staffMiddleware } = require('../middlewares/AdminMiddleware');
const { checkCreateOrder } = require('../validation/OrderValidation');
router.post('/create', auth, OrderController.createOrder);
router.get('/getAllByAccountId', auth, OrderController.getAllOrderByAccountId)
router.get('/getAll', staffMiddleware, OrderController.getAllOrder)
router.get('/getDetail/:id', auth, OrderController.getDetailOrder)
router.put('/cancelOrder/:id', auth, OrderController.cancelOrder)
// router.put('/reSoldOrder/:id', auth, OrderController.reSoldOrder)
module.exports = router