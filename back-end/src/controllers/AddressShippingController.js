
const { validationResult } = require('express-validator');
const AddressShippingServices = require('../services/AddressShippingServices')
const updateAddressShipping = async (req, res) => {
    const id = req.params.id
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({
        //         errors: errors.array()
        //     })
        // }

        const response = await AddressShippingServices.updateAddressShipping(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getDetailAddressShipping = async (req, res) => {
    const addressId = req.params.id;
    try {
        if (!addressId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The addressId is required'
            })
        }
        const response = await AddressShippingServices.getDetailAddressShipping(addressId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const setDefaultAddressShipping = async (req, res) => {
    const addressId = req.params.id;
    try {
        if (!addressId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The addressId is required'
            })
        }
        const response = await AddressShippingServices.setDefaultAddressShipping(addressId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllAddressShipping = async (req, res) => {
    try {
        const { page, limit, search } = req.query
        const accountId = req.user.id;
        const response = await AddressShippingServices.getAllAddressShipping(accountId, page, limit, search)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const deleteAddressShipping = async (req, res) => {
    const addressId = req.params.id
    try {
        const response = await AddressShippingServices.deleteAddressShipping(addressId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

module.exports = {
    updateAddressShipping, getAllAddressShipping,
    getDetailAddressShipping, deleteAddressShipping,
    setDefaultAddressShipping
}