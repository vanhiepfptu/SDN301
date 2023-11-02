const AdminServices = require('../services/AdminServices');
const totalOrder = async (req, res) => {
    try {
        const { time, number } = req.query;
        const response = await AdminServices.totalOrder(time, number);
        return res.status(201).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

const numberOrder = async (req, res) => {
    try {
        const response = await AdminServices.numberOrder();
        return res.status(201).json(response)
    } catch (err) {
        return res.status(404).json({
            status: 'ERR',
            message: err.message
        })
    }
}

const dataMonth = async (req, res) => {
    try {
        const response = await AdminServices.dataMonth();
        return res.status(201).json(response);
    } catch (err) {
        return res.status(404).json({
            status: 'ERR',
            message: err.message
        })
    }
}

module.exports = {
    totalOrder,
    numberOrder,
    dataMonth
}