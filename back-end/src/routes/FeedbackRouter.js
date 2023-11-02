const express = require('express')
const router = express.Router()
const { auth } = require('../middlewares/AdminMiddleware');
const FeedbackController = require('../controllers/FeedbackController');
const { checkIsNumber } = require('../validation');
router.post('/create/', auth,
    [checkIsNumber('rate', 'rate must be a number')],
    FeedbackController.feedbackProduct)
router.put('/update/:id', auth,
    [checkIsNumber('rate', 'rate must be a number')],
    FeedbackController.updateFeedbackProduct)
router.delete('/delete/:id', auth, FeedbackController.deleteFeedbackProduct)
router.get('/getAll', FeedbackController.getAllFeedbackProduct)
router.get('/getByProductId/:id', FeedbackController.getAllFeedbackByProductId)
router.get('/getByAccountId', auth, FeedbackController.getAllFeedbackByAccountId)
router.get('/:id', FeedbackController.getDetailFeedbackProduct)
module.exports = router

