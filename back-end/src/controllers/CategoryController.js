const { validationResult } = require('express-validator');
const CategoryServices = require('../services/CategoryServices')
const createCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const response = await CategoryServices.createCategory(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const updateCategory = async (req, res) => {
    const id = req.params.id
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const response = await CategoryServices.updateCategory(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getDetailCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        if (!categoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The categoryId is required'
            })
        }
        const response = await CategoryServices.getDetailCategory(categoryId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllCategory = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const response = await CategoryServices.getAllCategory(page, limit, search)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
module.exports = {
    createCategory, updateCategory, getDetailCategory, getAllCategory
}