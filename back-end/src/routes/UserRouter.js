const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController');
const { adminMiddleware, auth } = require('../middlewares/AdminMiddleware');
const { validateRegisterUser } = require('../validation/UserValidation');
router.post('/register', auth, validateRegisterUser, UserController.registerUser);
router.get('/getAll', adminMiddleware, UserController.getAllUsers)
router.put('/update', auth, validateRegisterUser, UserController.updateUser)
router.get('/getDetail', auth, UserController.getDetailUser)
router.get('/getDetailUserByAccountId/:id', auth, UserController.getDetailUserByAccountId)
module.exports = router

