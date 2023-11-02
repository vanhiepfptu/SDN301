const { validationResult } = require('express-validator');
const UserServices = require('../services/UserServices')

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const accountId = req.user.id
        const response = await UserServices.registerUser(accountId, req.body)
        return res.status(201).json(response)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(404).json({
                status: 'ERR',
                message: "Email already exists"
            })
        }
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getDetailUser = async (req, res) => {
    const accountId = req.user.id;
    try {
        if (!accountId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The accountId is required'
            })
        }
        const response = await UserServices.getDetailUser(accountId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const updateUser = async (req, res) => {
    const accountId = req.user.id;
    try {
        if (!accountId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The accountId is required'
            })
        }
        const response = await UserServices.updateUser(accountId, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllUsers = async (req, res) => {
    try {
        const { page, limit, search } = req.query
        const response = await UserServices.getAllUsers(page, limit, search)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getDetailUserByAccountId = async (req, res) => {
    try {
        const accountId = req.params.id
        const response = await UserServices.getDetailUserByAccountId(accountId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
module.exports = {
    registerUser, getDetailUser, updateUser, getAllUsers, getDetailUserByAccountId
}