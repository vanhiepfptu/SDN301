
const { validationResult } = require('express-validator');
const ShippingServices = require('../services/ShippingServices');
const startReceiveOrder = async (req, res) => {
    try {
        const shippingId = req.user.id
        const response = await ShippingServices.startReceiveOrder(shippingId, req.body)
        if (response.status === 'OK') {
            await ShippingServices.sendEmailStartShipping(response.data)
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

const successDeliveryOrder = async (req, res) => {
    try {
        const shippingId = req.user.id
        const response = await ShippingServices.successDeliveryOrder(shippingId, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const failedDeliveryOrder = async (req, res) => {
    try {
        const shippingId = req.user.id
        const response = await ShippingServices.failedDeliveryOrder(shippingId, req.body)
        if (response.status === 'OK') {
            await ShippingServices.sendEmailFailedShipping(response.data)
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllOrder = async (req, res) => {
    try {
        const { page, limit } = req.query
        const response = await ShippingServices.getAllOrder(page, limit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

const getDetailOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const response = await ShippingServices.getDetailOrder(orderId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllOrderSuccessByShipping = async (req, res) => {
    try {
        const shippingId = req.user.id
        const response = await ShippingServices.getAllOrderSuccessByShipping(shippingId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const returnOrder = async (req, res) => {
    try {
        const { orderId, message } = req.body
        const shippingId = req.user.id
        const response = await ShippingServices.returnOrder(shippingId, orderId, message)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

module.exports = {
    startReceiveOrder, successDeliveryOrder, failedDeliveryOrder,
    getAllOrder, getDetailOrder, returnOrder, getAllOrderSuccessByShipping
}