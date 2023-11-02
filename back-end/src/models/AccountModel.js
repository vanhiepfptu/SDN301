const mongoose = require('mongoose')
const Role = require("./RoleModel");
const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
        default: '650110164699e3d01b36a4f1'
        // 650110164699e3d01b36a4f1    user
        // 6501130c4699e3d01b36a4f2    shipping
        // 65010efa4699e3d01b36a4f0    admin
        // 650113c74699e3d01b36a4f3    staff
    },
    isActive: {
        type: Boolean,
        default: true
    },
    deActiveAt: {
        type: Date
    },
    deActiveReason: {
        type: String,
    },
    cart: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})
const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
