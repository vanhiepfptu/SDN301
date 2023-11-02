const InvoiceServices = require('../services/InvoiceServices')
const orderCompany = async (req, res) => {
    try {
        const response = await InvoiceServices.orderCompany(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getDetailOrderCompany = async (req, res) => {
    const invoiceId = req.params.id;
    try {
        if (!invoiceId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The invoiceId is required'
            })
        }
        const response = await InvoiceServices.getDetailOrderCompany(invoiceId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

const getAllOrderCompany = async (req, res) => {
    try {
        const { page, limit, startDate, endDate } = req.query;
        const response = await InvoiceServices.getAllOrderCompany(page, limit, startDate, endDate)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
module.exports = {
    orderCompany, getAllOrderCompany, getDetailOrderCompany
}