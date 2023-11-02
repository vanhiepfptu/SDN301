const Account = require("../models/AccountModel")
const User = require("../models/UserModel")
const LIMIT_USER = 10;
const registerUser = async (accountId, data) => {
    const { email, phone, image, dateOfBirth, gender } = data
    return new Promise(async (resolve, reject) => {
        try {
            const createUser = await User.create({
                email,
                phone,
                image,
                dateOfBirth,
                gender,
                accountId
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'User created successfully',
                    data: createUser
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}
const getDetailUser = (accountId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                accountId: accountId
            })
                .populate('accountId')
                .populate({
                    path: 'accountId',
                    populate: {
                        path: 'role'
                    }
                })

            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            user._doc.accountId.password = "******";
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getDetailUserByAccountId = (accountId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                accountId: accountId
            })
                .populate('accountId')
                .populate({
                    path: 'accountId',
                    populate: {
                        path: 'role'
                    }
                })

            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            user._doc.accountId.password = "******";
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        } catch (err) {
            reject(err)
        }
    })
}
const updateUser = (accountId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, phone, image, dateOfBirth, gender } = data
            const user = await User.findOne({
                accountId
            })
                .populate('accountId')
                .populate({
                    path: 'accountId',
                    populate: {
                        path: 'role'
                    }
                })

            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            const userUpdate = {
                ...user._doc,
                email,
                phone, image, dateOfBirth, gender
            }
            await User.findByIdAndUpdate(user._id, userUpdate, { new: true })
            userUpdate.accountId.password = "******";
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: userUpdate
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllUsers = (page = 1, limit = LIMIT_USER, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const conditions = {
                $or: [
                    { email: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } },
                    { address: { $regex: search, $options: 'i' } },
                ]
            };
            const searchQuery = search ? conditions : null;
            const totalUser = await User.count(searchQuery)
            const allUser = await User.find(searchQuery)
                .skip(skipNumber)
                .limit(limit)
                .populate('accountId')
                .populate({
                    path: 'accountId',
                    populate: {
                        path: 'role'
                    }
                })
            const newAllUser = allUser.map((user) => {
                const newUser = { ...user._doc };
                if (newUser.accountId) {
                    newUser.accountId.password = '******'
                }
                return newUser;
            })
            resolve({
                status: 'OK',
                data: newAllUser,
                totalUser,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    registerUser, getDetailUser, updateUser, getAllUsers,
    getDetailUserByAccountId
}