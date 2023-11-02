const { checkIsEmpty } = require("../index")

const validateCreateSubCategory = [
    checkIsEmpty('name', 'name can be not blank'),
]
module.exports = {
    validateCreateSubCategory
}