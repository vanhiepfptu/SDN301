const mongoose = require('mongoose')
const roleSchema = new mongoose.Schema({
    roleId: {
        type: Number,
        unique: true,
        required: true
    },
    roleName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
})
const Role = mongoose.model('Role', roleSchema)
module.exports = Role
