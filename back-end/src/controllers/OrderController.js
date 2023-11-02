const { validationResult } = require('express-validator');
const OrderServices = require('../services/OrderServices');

const createOrder = async (req, res) => {
    try {
        const { customerName, customerPhone, customerAddress, addressShippingId } = req.body
        if (!addressShippingId) {
            if (!customerName || !customerPhone || !customerAddress) {
                return res.status(400).json({
                    status: 'ERR',
                    message: 'Please enter complete information'
                })
            }
        }
        const accountId = req.user.id
        const response = await OrderServices.createOrder(accountId, req.body)
        // await OrderServices.sendEmailCreateOrder(response?.data?.email, response.data)
        return res.status(201).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllOrderByAccountId = async (req, res) => {
    try {
        const accountId = req.user.id
        const { page, limit } = req.body
        const response = await OrderServices.getAllOrderByAccountId(page, limit, accountId)
        return res.status(201).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllOrder = async (req, res) => {
    try {
        const { page, limit, status } = req.query
        const response = await OrderServices.getAllOrder(page, limit, status)
        return res.status(201).json(response)
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
        const response = await OrderServices.getDetailOrder(orderId)
        return res.status(201).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const response = await OrderServices.cancelOrder(orderId, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
// const reSoldOrder = async (req, res) => {
//     try {
//         const orderId = req.params.id
//         const response = await OrderServices.reSoldOrder(orderId)
//         return res.status(200).json(response)
//     } catch (error) {
//         return res.status(404).json({
//             status: 'ERR',
//             message: error.message
//         })
//     }
// }

module.exports = {
    createOrder, getAllOrderByAccountId,
    getAllOrder, getDetailOrder,
    cancelOrder,

}