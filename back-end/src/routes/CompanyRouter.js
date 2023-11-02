const express = require('express')
const router = express.Router()
const CompanyController = require('../controllers/CompanyController');
const { staffMiddleware } = require('../middlewares/AdminMiddleware');
router.post('/associate', staffMiddleware, CompanyController.createCompany)
router.put('/update/:id', staffMiddleware, CompanyController.updateCompany)
router.get('/getAll', staffMiddleware, CompanyController.getAllCompany)
router.get('/:id', staffMiddleware, CompanyController.getDetailCompany)
router.delete('/:id', staffMiddleware, CompanyController.deleteCompany)
module.exports = router

