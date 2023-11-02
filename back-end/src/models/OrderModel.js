const mongoose = require('mongoose');
const SubCategory = require("./SubCategoryModel");
const OrderSchema = new mongoose.Schema({
    addressShippingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddressShipping',
        required: true,
    },
    cart: {
        type: Array,
        default: []
    },
    totalPrice: {
        type: Number,
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    isDelivery: {
        type: Boolean,
        default: false
    },
    isCancel: {
        type: Boolean,
        default: false
    },
    isDeliverySuccess: {
        type: Boolean,
        default: false
    },
    reasonCancel: {
        type: String,
        default: ''
    },
    shippingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    }

}, {
    timestamps: true
})
const Order = mongoose.model('Order', OrderSchema)
module.exports = Order
