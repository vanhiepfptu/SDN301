const mongoose = require('mongoose')
const Account = require("./AccountModel");

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    phone: { type: String },
    image: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: Boolean },
    address: { type: String },
    salary: { type: Number },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
}, {
    timestamps: true
})
const User = mongoose.model('User', userSchema)
module.exports = User