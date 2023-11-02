const Category = require("../models/CategoryModel");
const Company = require("../models/CompanyModel");
const LIMIT_CATEGORY = 10;
const createCompany = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, address, website, email } = data
        try {
            const checkCompanyExists = await Company.findOne({
                name: name
            })
            if (checkCompanyExists !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Company already exists!'
                })
            }
            const createCompany = await Company.create({
                name,
                image,
                address,
                website,
                email
            })
            resolve({
                status: 'OK',
                message: 'Company associated successfully',
                data: createCompany
            })
        } catch (err) {
            reject(err)
        }
    })
}
const updateCompany = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCompanyExists = await Company.findOne({
                _id: id
            })
            if (checkCompanyExists === null) {
                resolve({
                    status: 'ERR',
                    message: 'Company is not defined!'
                })
            }
            await Company.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getDetailCompany = (companyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const company = await Company.findOne({
                _id: companyId
            })

            if (company === null) {
                resolve({
                    status: 'ERR',
                    message: `The company is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: company
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllCompany = (page = 1, limit = LIMIT_CATEGORY, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const conditions = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { address: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { website: { $regex: search, $options: 'i' } },
                ]
            };
            const searchQuery = search ? conditions : null;
            const totalCompany = await Company.count(searchQuery)
            const allCompany = await Company.find(searchQuery)
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: allCompany,
                totalCompany,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const deleteCompany = (companyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Company.findByIdAndDelete({
                _id: companyId
            })
            resolve({
                status: 'OK',
                messages: "Delete Successfully"
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    createCompany, updateCompany, getDetailCompany, getAllCompany, deleteCompany
}