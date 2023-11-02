const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    quantity: {
        type: Number,
        require: true,
    },
    price: {
        type: Number
    },
    unit: {
        type: String
    },
    date_of_manufacture: {
        type: Date,
        require: true,
    },
    date_of_expiration: {
        type: Date
    }
}, {
    timestamps: true
})
const Inventory = mongoose.model('Inventory', inventorySchema)
module.exports = Inventory
