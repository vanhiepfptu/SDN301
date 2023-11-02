
const { body, validationResult } = require('express-validator');
const checkIsEmpty = (param, message) => body(param).notEmpty().withMessage(message);
const checkLength = (param, min, max, message) => body(param).isLength({ min: min, max: max }).withMessage(message);
const checkMinLength = (param, min, message) => body(param).isLength({ min: min }).withMessage(message);
const checkMaxLength = (param, max, message) => body(param).isLength({ max: max }).withMessage(message);
const checkIsEmail = (param, message) => body(param).isEmail().withMessage(message);
const checkIsString = (param, message) => body(param).isString().withMessage(message);
const checkIsNumber = (param, message) => body(param).isNumeric().withMessage(message);
const checkIsBoolean = (param, message) => body(param).isBoolean().withMessage(message);
const checkIsDate = (param, message) => body(param).isDate().withMessage(message);
const checkIsPhoneNumber = (value) => {
    // Define a regular expression to match a valid phone number
    const phoneRegex = /^[0-9]{10}$/; // This is a simple example; adjust it for your use case
    // Return true if the value matches the regular expression, else false
    return phoneRegex.test(value);
};
module.exports = {
    checkIsEmpty, checkLength, checkMaxLength, checkMinLength,
    checkIsEmail, checkIsString, checkIsNumber, checkIsBoolean,
    checkIsDate, checkIsPhoneNumber
}
