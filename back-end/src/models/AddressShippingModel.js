const mongoose = require('mongoose');
const Account = require('./AccountModel');
const addressShippingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    isDefault: { //địa chỉ mặc định
        type: Boolean,
        default: false
    },
    isOffice: {
        type: Boolean,
        default: false
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    }
}, {
    timestamps: true
})
const AddressShipping = mongoose.model('AddressShipping', addressShippingSchema)
module.exports = AddressShipping
