const express = require('express')
const router = express.Router()
const SubCategoryController = require('../controllers/SubCategoryController');
const { staffMiddleware } = require('../middlewares/AdminMiddleware');
const { validateCreateSubCategory } = require('../validation/SubCategoryValidation');
router.post('/create/:id',
    staffMiddleware, validateCreateSubCategory,
    SubCategoryController.createSubCategory)
router.put('/update/:id', staffMiddleware, validateCreateSubCategory, SubCategoryController.updateSubCategory)
router.get('/getAll', SubCategoryController.getAllSubCategory)
router.put('/getByCategoryId', SubCategoryController.getAllSubCategoryByCategoryId)
router.delete('/delete/:id', staffMiddleware, SubCategoryController.deleteSubCategory)
router.get('/:id', SubCategoryController.getDetailSubCategory)
module.exports = router