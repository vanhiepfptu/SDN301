const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/AdminController')
const { adminMiddleware } = require('../middlewares/AdminMiddleware');

router.get('/manager/order', adminMiddleware, AdminController.totalOrder);
router.get('/manager/chart', adminMiddleware, AdminController.numberOrder)
router.get('/manager/chartMonth', adminMiddleware, AdminController.dataMonth)
module.exports = router
