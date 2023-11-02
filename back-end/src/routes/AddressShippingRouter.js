const express = require('express')
const router = express.Router()
const AddressShippingController = require('../controllers/AddressShippingController');
const { auth } = require('../middlewares/AdminMiddleware');
router.put('/update/:id', auth, AddressShippingController.updateAddressShipping)
router.get('/getAll', auth, AddressShippingController.getAllAddressShipping)
router.delete('/delete/:id', auth, AddressShippingController.deleteAddressShipping)
router.get('/:id', auth, AddressShippingController.getDetailAddressShipping)
router.put('/setDefault/:id', auth, AddressShippingController.setDefaultAddressShipping)
module.exports = router

