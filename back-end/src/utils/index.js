const Feedback = require("../models/FeedbackModel")
const Inventory = require("../models/InventoryModel")
const Invoice = require("../models/InvoiceModel")
const Product = require("../models/ProductModel")
const User = require("../models/UserModel")

const getAverageRateByProduct = async (productId) => {
    const numberRate = await Feedback.count({
        productId
    })
    const averageRate = await Feedback.aggregate([
        {
            $match: {
                productId: productId,
            },
        },
        {
            $group: {
                _id: productId,
                total: { $sum: '$rate' },
            },
        },
    ])
    return Number((averageRate[0]?.total / numberRate).toFixed(1))
}

const getAverageRateByAccount = async (accountId) => {
    const numberRate = await Feedback.count({
        accountId
    })
    const averageRate = await Feedback.aggregate([
        {
            $match: {
                accountId: accountId,
            },
        },
        {
            $group: {
                _id: accountId,
                total: { $sum: '$rate' },
            },
        },
    ])
    return Number((averageRate[0]?.total / numberRate).toFixed(1))
}
const sold = async (id, quantity) => {
    const productExist = await Product.findOne({
        _id: id
    })
    let prod = await Product.findOneAndUpdate({ _id: id }, {
        numberSold: parseInt(productExist?.numberSold + quantity),
        quantity: parseInt(productExist?.quantity - quantity),
    }, { new: true });
    if (prod.quantity === 0) {
        prod = await Product.findOneAndUpdate({ _id: id }, {
            status: false,
        }, { new: true });
    }
    return prod;
};
const reSold = async (id, quantity) => {
    const productExist = await Product.findOne({
        _id: id
    })
    let prod = await Product.findOneAndUpdate({ _id: id }, {
        numberSold: parseInt(productExist?.numberSold - quantity),
        quantity: parseInt(productExist?.quantity + quantity),
    }, { new: true });
    return prod;
};

const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}
const totalExpenditure = async () => {
    const allInvoices = await Invoice.find({});
    let totalInvoices = 0;
    for (let i = 0; i < allInvoices.length; i++) {
        totalInvoices += allInvoices[i]?.totalPrice
    }
    return totalInvoices
}
const totalSalaryEmployees = async () => {
    const allEmployee = await User.find({});
    console.log("a", allEmployee)
    let totalSalaryEmployee = 0;
    for (let i = 0; i < allEmployee.length; i++) {
        totalSalaryEmployee += allEmployee[i]?.salary ?? 0
    }
    return totalSalaryEmployee
}
module.exports = {
    getAverageRateByProduct,
    getAverageRateByAccount, sold, reSold,
    totalExpenditure,
    generateRandomString, totalSalaryEmployees
}