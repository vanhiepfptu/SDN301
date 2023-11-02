const Account = require("../models/AccountModel")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtServices");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const LIMIT_ACCOUNT = 10;
const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');
const { generateRandomString } = require("../utils");
const registerAccount = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { username, password, confirmPassword } = newUser
        try {
            const checkExistUser = await Account.findOne({
                username
            })
            if (checkExistUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Username already exists!'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            if (!checkExistUser) {
                const createUser = await Account.create({
                    username,
                    password: hash
                })
                const newUser = {
                    ...createUser._doc,
                    password: '******'
                }
                resolve({
                    status: 'OK',
                    message: 'User created successfully',
                    data: newUser
                })
            }

        } catch (err) {
            reject(err)
        }

    })
}

const loginAccount = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { username, password } = userLogin
        try {
            const checkUser = await Account.findOne({
                username
            })
                .populate('role')
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password  is incorrect',
                })
            }
            const accessToken = await generalAccessToken({
                id: checkUser?._id,
                roleId: checkUser?.role?.roleId,
                roleName: checkUser?.role?.roleName
            })
            const refreshToken = await generalRefreshToken({
                id: checkUser?._id,
                roleId: checkUser?.role?.roleId,
                roleName: checkUser?.role?.roleName
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                accessToken, refreshToken
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailAccount = (accountId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Account.findOne({
                _id: accountId
            })
                .populate('role')

            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            const newUser = {
                ...user._doc,
                password: '******'
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newUser
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllAccount = (page = 1, limit = LIMIT_ACCOUNT, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            Number.parseInt(limit);
            var skipNumber = (page - 1) * limit;
            const searchQuery = search ? { username: { $regex: search, $options: 'i' } } : null;
            const totalAccount = await Account.count(searchQuery);
            const allAccount = await Account.find(searchQuery)
                .skip(skipNumber)
                .limit(limit)
                .populate('role')
            const newAccount = allAccount.map((account) => {
                return { ...account._doc, password: '******' }
            })
            resolve({
                status: 'OK',
                data: newAccount,
                totalAccount,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const deActiveAccount = (userId, deActiveAt, deActiveReason) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Account.findOne({
                _id: userId
            })
                .populate('role')

            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            const userDeActive = {
                ...user._doc,
                isActive: false,
                deActiveAt,
                deActiveReason,
            }
            const accountDisabled = await Account.findByIdAndUpdate(userId, userDeActive, { new: true })
            const newAccountDisabled = {
                ...accountDisabled._doc,
                password: '******'
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newAccountDisabled
            })
        } catch (err) {
            reject(err)
        }
    })
}
const inActiveAccount = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Account.findOne({
                _id: userId
            })
                .populate('role')
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            const userInActive = {
                ...user._doc,
                isActive: true,
                deActiveAt: '',
                deActiveReason: ''
            }

            const accountActive = await Account.findByIdAndUpdate(userId, userInActive, { new: true })
            const newAccountActive = {
                ...accountActive._doc,
                password: '******'
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newAccountActive
            })
        } catch (err) {
            reject(err)
        }
    })
}
const changePassword = (accountId, newPassword, currentPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Account.findOne({
                _id: accountId
            })
                .populate('role')
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            const comparePassword = bcrypt.compareSync(currentPassword, user.password)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password  is incorrect',
                })
            }
            if (comparePassword) {
                const hash = bcrypt.hashSync(newPassword, 10)
                const userChangePass = {
                    ...user._doc,
                    password: hash
                }
                const userChangePassword = await Account.findByIdAndUpdate(user._id, userChangePass, { new: true })
                const newUserChangePassword = {
                    ...userChangePassword._doc,
                    password: '******'
                }
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newUserChangePassword
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}
const forgotPassword = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                email
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: `The email is not register `
                })
            }
            const newPassword = await sendEmailForgotPassword(email)
            const hash = bcrypt.hashSync(newPassword, 10)

            await Account.findByIdAndUpdate(user.accountId, {
                password: hash
            }, { new: true })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
            })
        } catch (err) {
            reject(err)
        }
    })
}
const addCart = (accountId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkAccountExist = await Account.findOne({ _id: accountId });
            if (checkAccountExist === null) {
                resolve({
                    status: 'ERR',
                    message: `The account is not defined `
                })
            }
            for (i = 0; i < data.length; i++) {
                var checkProductExist = await Product.findOne({ _id: data[i].productId })
                if (checkProductExist.quantity === 0) {
                    resolve({
                        status: 'ERR',
                        message: 'Product is sold out',
                    })
                }
                if (checkProductExist.quantity < data[i].quantity) {
                    resolve({
                        status: 'ERR',
                        message: 'Not enough quantity',
                    })
                }

            }
            const newAccount = await Account.findByIdAndUpdate(
                checkAccountExist._id, {
                cart: data,
            }, { new: true }
            );
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                cart: newAccount.cart
            })
        } catch (err) {
            reject(err)
        }
    })
}

const sendEmailForgotPassword = async (email) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
    });
    transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));
    // send mail with defined transport object
    const newPassword = generateRandomString(6)
    await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "Quên mật khẩu", // Subject line
        text: "Hello ", // plain text body
        html: `<div>Mật khẩu mới của bạn là: <b>${newPassword}</b></div>`,
    });
    return newPassword
}
module.exports = {
    registerAccount, getDetailAccount,
    loginAccount, deActiveAccount,
    inActiveAccount, changePassword, getAllAccount,
    addCart, forgotPassword, sendEmailForgotPassword
}
