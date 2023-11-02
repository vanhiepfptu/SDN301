const { validationResult } = require('express-validator');
const SubCategoryServices = require('../services/SubCategoryServices')

const createSubCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const response = await SubCategoryServices.createSubCategory(categoryId, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

const updateSubCategory = async (req, res) => {
    const id = req.params.id
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const response = await SubCategoryServices.updateSubCategory(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getDetailSubCategory = async (req, res) => {
    const subCategoryId = req.params.id;
    try {
        if (!subCategoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The subCategoryId is required'
            })
        }
        const response = await SubCategoryServices.getDetailSubCategory(subCategoryId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllSubCategoryByCategoryId = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const { categoryId } = req.body
        const response = await SubCategoryServices.getAllSubCategoryByCategoryId(page, limit, search, categoryId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllSubCategory = async (req, res) => {
    try {
        const { page, limit, search } = req.query
        const response = await SubCategoryServices.getAllSubCategory(page, limit, search)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const deleteSubCategory = async (req, res) => {
    const subCategoryId = req.params.id
    try {
        const response = await SubCategoryServices.deleteSubCategory(subCategoryId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
module.exports = {
    createSubCategory,
    getAllSubCategory,
    getAllSubCategoryByCategoryId,
    getDetailSubCategory,
    updateSubCategory,
    deleteSubCategory
}