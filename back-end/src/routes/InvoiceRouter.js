const express = require('express')
const router = express.Router()
const InvoiceController = require('../controllers/InvoiceController');
const { staffMiddleware } = require('../middlewares/AdminMiddleware');
// order của các công ty
router.post('/order', staffMiddleware, InvoiceController.orderCompany);
router.get('/getAll', staffMiddleware, InvoiceController.getAllOrderCompany);
router.get('/:id', staffMiddleware, InvoiceController.getDetailOrderCompany);

module.exports = router