const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController');
const { staffMiddleware } = require('../middlewares/AdminMiddleware');
const { validateCreateCategory } = require('../validation/CategoryValidation');
router.post('/create', staffMiddleware, validateCreateCategory, CategoryController.createCategory)
router.put('/update/:id', staffMiddleware, validateCreateCategory, CategoryController.updateCategory)
router.get('/getAll', CategoryController.getAllCategory)
router.get('/:id', CategoryController.getDetailCategory)
module.exports = router