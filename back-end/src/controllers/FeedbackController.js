
const { validationResult } = require('express-validator');
const FeedbackServices = require('../services/FeedbackServices')

const feedbackProduct = async (req, res) => {
    try {
        const accountId = req.user.id
        const response = await FeedbackServices.feedbackProduct(accountId, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const updateFeedbackProduct = async (req, res) => {
    const feedbackProductId = req.params.id
    try {
        const response = await FeedbackServices.updateFeedbackProduct(feedbackProductId, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const deleteFeedbackProduct = async (req, res) => {
    const feedbackProductId = req.params.id
    try {
        const response = await FeedbackServices.deleteFeedbackProduct(feedbackProductId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getDetailFeedbackProduct = async (req, res) => {
    const feedBackProductId = req.params.id;
    try {
        if (!feedBackProductId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The feedBackProductId is required'
            })
        }
        const response = await FeedbackServices.getDetailFeedbackProduct(feedBackProductId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllFeedbackProduct = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const response = await FeedbackServices.getAllFeedbackProduct(page, limit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

const getAllFeedbackByProductId = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const productId = req.params.id
        const response = await FeedbackServices.getAllFeedbackByProductId(page, limit, productId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllFeedbackByAccountId = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const accountId = req.user.id
        const response = await FeedbackServices.getAllFeedbackByAccountId(page, limit, accountId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

module.exports = {
    feedbackProduct, updateFeedbackProduct, deleteFeedbackProduct,
    getDetailFeedbackProduct, getAllFeedbackProduct, getAllFeedbackByProductId,
    getAllFeedbackByAccountId
}