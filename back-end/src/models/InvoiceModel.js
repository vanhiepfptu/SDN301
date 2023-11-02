const mongoose = require('mongoose');
const Company = require("./CompanyModel");
const invoiceSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    bills: [
        {
            name: {
                type: String,
                require: true
            },
            quantity: {
                type: Number,
                require: true
            },
            price: {
                type: Number,
                require: true
            },
        }
    ],
    totalPrice: {
        type: Number
    },
    day_of_order: {
        type: Date
    }

}, {
    timestamps: true
})
const Invoice = mongoose.model('Invoice', invoiceSchema)
module.exports = Invoice
