const mongoose = require('mongoose');
const Account = require("./AccountModel");
const Product = require("./ProductModel");

const feedbackSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    content: {
        type: String,
    },
    rate: {
        type: Number,
    },
    image: {
        type: String,
    },
    timeAt: {
        type: Date
    }

}, {
    timestamps: true
})
const Feedback = mongoose.model('Feedback', feedbackSchema)
module.exports = Feedback
