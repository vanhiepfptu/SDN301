const { checkIsEmpty, checkMinLength, checkIsPhoneNumber, checkIsEmail, checkLength, checkIsDate, checkIsBoolean, checkIsNumber } = require("../index")

const checkCreateOrder = [
    checkIsEmpty('customerName', 'customerName can not be blank'),
    checkIsEmpty('customerPhone', 'customerPhone can not be blank'),
    checkIsEmpty('customerAddress', 'customerAddress can not be blank'),
]
module.exports = {
    checkCreateOrder,
}