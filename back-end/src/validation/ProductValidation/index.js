const { checkIsEmpty, checkMinLength, checkIsPhoneNumber, checkIsEmail, checkLength, checkIsDate, checkIsBoolean, checkIsNumber } = require("../index")

const validateCreateProduct = [
    checkIsEmpty('name', 'name can be not blank'),
    checkIsEmpty('price', 'price can not be blank'),
    checkIsNumber('price', 'price is not a number'),
    checkIsEmpty('quantity', 'quantity can not be blank'),
    checkIsNumber('quantity', 'quantity is not a number'),
    checkIsEmpty('subCategoryId', 'subCategory can not be blank'),
]
module.exports = {
    validateCreateProduct
}