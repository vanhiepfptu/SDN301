const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const { validateCreateProduct } = require('../validation/ProductValidation');
const { staffMiddleware } = require('../middlewares/AdminMiddleware');
router.post('/create', staffMiddleware, validateCreateProduct, ProductController.createProduct);
router.put('/update/:id', staffMiddleware, validateCreateProduct, ProductController.updateProduct);
router.get('/getAll', ProductController.getAllProduct);
router.delete('/delete/:id', staffMiddleware, ProductController.deleteProduct);
router.put('/getBySubcategoryId', ProductController.getAllProductBySubCategoryId)
router.put('/getByCategoryId', ProductController.getAllProductByCategoryId)
router.get('/:id', ProductController.getDetailProduct);
module.exports = router