const { checkIsEmpty } = require("../index")
const validateCreateCategory = [
    checkIsEmpty('name', 'name can be not blank'),
]
module.exports = {
    validateCreateCategory
}