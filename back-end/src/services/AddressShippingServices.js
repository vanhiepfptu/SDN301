const AddressShipping = require("../models/AddressShippingModel");
const Category = require("../models/CategoryModel")
const LIMIT_ADDRESS_SHIPPING = 5;
const updateAddressShipping = (addressId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkAddressExists = await AddressShipping.findOne({
                _id: addressId
            })
            if (!checkAddressExists) {
                resolve({
                    status: 'ERR',
                    message: 'AddressShipping is not defined!'
                })
            }
            await AddressShipping.findByIdAndUpdate(checkAddressExists._id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data
            })
        } catch (err) {
            reject(err)
        }
    })
}

const getDetailAddressShipping = (addressId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const addressShipping = await AddressShipping.findOne({
                _id: addressId
            })

            if (addressShipping === null) {
                resolve({
                    status: 'ERR',
                    message: `The addressShipping is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: addressShipping
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllAddressShipping = (accountId, page = 1, limit = LIMIT_ADDRESS_SHIPPING, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const conditions = {
                $or: [
                    { customerName: { $regex: search, $options: 'i' } },
                    { address: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } },
                ],
                accountId
            };
            const searchQuery = search ? conditions : null;
            const totalAddressShipping = await AddressShipping.count(searchQuery)
            const allAddressShipping = await AddressShipping.find(searchQuery)
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: allAddressShipping,
                totalAddressShipping,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const setDefaultAddressShipping = (addressId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const addressShippingExist = await AddressShipping.findOne({
                _id: addressId
            })
            if (addressShippingExist === null) {
                resolve({
                    status: 'ERR',
                    message: `The addressShipping is not defined `
                })
            }
            const allAddressShipping = await AddressShipping.find();
            for (i = 0; i < allAddressShipping.length; i++) {
                await AddressShipping.findByIdAndUpdate(allAddressShipping[i]._id, { isDefault: false }, { new: true });
            }
            const newAddress = await AddressShipping.findByIdAndUpdate(addressShippingExist._id, {
                ...addressShippingExist._doc,
                isDefault: true
            }, { new: true })
            resolve({
                status: 'OK',
                data: newAddress
            })

        } catch (err) {
            reject(err)
        }
    })
}

const deleteAddressShipping = (addressId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const addressExist = await AddressShipping.findOne({
                _id: addressId
            })
            if (addressExist === null) {
                resolve({
                    status: 'ERR',
                    message: `The addressShipping is not defined `
                })

            }
            await AddressShipping.findByIdAndDelete({
                _id: addressId
            })
            resolve({
                status: 'OK',
                messages: "Delete Successfully"
            })

        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    updateAddressShipping, getAllAddressShipping,
    getDetailAddressShipping, deleteAddressShipping,
    setDefaultAddressShipping
}