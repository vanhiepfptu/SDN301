const Company = require("../models/CompanyModel");
const Inventory = require("../models/InventoryModel");
const Invoice = require("../models/InvoiceModel");
const LIMIT_ORDER_COMPANY = 5;
const orderCompany = (data) => {
    return new Promise(async (resolve, reject) => {
        const { companyId, bills } = data
        try {
            const checkCompanyExists = await Company.findOne({
                _id: companyId
            })
            if (checkCompanyExists === null) {
                resolve({
                    status: 'ERR',
                    message: 'Company is not exists!'
                })
            }
            var totalPrice = 0;
            for (var i = 0; i < bills.length; i++) {
                var product = bills[i];
                totalPrice += product.price * product.quantity;
            }
            const createInvoiceOrder = await Invoice.create({
                companyId: checkCompanyExists._id,
                bills,
                totalPrice,
            })
            //  thêm vào trong kho
            for (let i = 0; i < bills.length; i++) {
                const checkProductInventoryExists = await Inventory.findOne({
                    name: bills[i].name
                })
                if (checkProductInventoryExists) {
                    await Inventory.findByIdAndUpdate(checkProductInventoryExists._id, {
                        quantity: bills[i].quantity + checkProductInventoryExists.quantity
                    }, { new: true })
                } else {
                    await Inventory.create({
                        name: bills[i].name,
                        quantity: bills[i].quantity,
                        price: bills[i].price,
                        unit: bills[i].unit,
                        date_of_manufacture: bills[i].date_of_manufacture,
                        date_of_expiration: bills[i].date_of_expiration
                    })
                }
            }
            resolve({
                status: 'OK',
                message: 'createInvoiceOrder successfully',
                data: createInvoiceOrder
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getDetailOrderCompany = (invoiceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const invoice = await Invoice.findOne({
                _id: invoiceId
            })
                .populate('companyId', 'name address image email website')
            if (invoice === null) {
                resolve({
                    status: 'ERR',
                    message: `The invoice is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: invoice
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllOrderCompany = (page = 1, limit = LIMIT_ORDER_COMPANY, startDate, endDate) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const conditions = {
                createdAt: {
                    $gte: new Date(JSON.stringify(startDate)),
                    $lte: new Date(JSON.stringify(endDate)) ?? new Date(),
                },
            };
            const searchQuery = (startDate || endDate) ? conditions : null;
            const totalOrderCompany = await Invoice.count(searchQuery)
            const allOrderCompany = await Invoice.find(searchQuery)
                .skip(skipNumber)
                .limit(limit)
                .populate('companyId', 'name address image email website')
            resolve({
                status: 'OK',
                data: allOrderCompany,
                totalOrderCompany,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    orderCompany, getAllOrderCompany, getDetailOrderCompany
}