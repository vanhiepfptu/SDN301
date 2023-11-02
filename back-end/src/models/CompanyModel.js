const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    image: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
    inventory: [{
        name: {
            type: String,
            require: true,
            unique: true,
        },
        price: {
            type: Number,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        },
        date_of_manufacture: {
            type: Date
        },
        date_of_expiration: {
            type: Date
        },
        unit: {
            type: String
        },
        description: {
            type: String
        }
    }]
}, {
    timestamps: true
})
const Company = mongoose.model('Company', companySchema)
module.exports = Company
