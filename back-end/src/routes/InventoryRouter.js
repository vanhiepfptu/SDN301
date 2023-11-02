const express = require('express')
const router = express.Router()
const InventoryController = require('../controllers/InventoryController');
const { staffMiddleware } = require('../middlewares/AdminMiddleware');
router.get('/getAll', staffMiddleware, InventoryController.getAllInventory)
router.get('/:id', staffMiddleware, InventoryController.getDetailInventory)
module.exports = router

