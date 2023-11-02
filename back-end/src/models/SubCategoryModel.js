const mongoose = require('mongoose');
const Category = require("./CategoryModel");

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        // unique: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }

}, {
    timestamps: true
})
const SubCategory = mongoose.model('SubCategory', subCategorySchema)
module.exports = SubCategory
