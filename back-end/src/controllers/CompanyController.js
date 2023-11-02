const CompanyServices = require('../services/CompanyServices')
const createCompany = async (req, res) => {
    try {
        const response = await CompanyServices.createCompany(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const updateCompany = async (req, res) => {
    const id = req.params.id
    try {
        const response = await CompanyServices.updateCompany(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getDetailCompany = async (req, res) => {
    const companyId = req.params.id;
    try {
        if (!companyId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The companyId is required'
            })
        }
        const response = await CompanyServices.getDetailCompany(companyId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const deleteCompany = async (req, res) => {
    const companyId = req.params.id;
    try {
        if (!companyId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The companyId is required'
            })
        }
        const response = await CompanyServices.deleteCompany(companyId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllCompany = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const response = await CompanyServices.getAllCompany(page, limit, search)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
module.exports = {
    createCompany, updateCompany, getDetailCompany, getAllCompany, deleteCompany
}