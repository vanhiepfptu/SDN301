const Category = require("../models/CategoryModel")
const LIMIT_CATEGORY = 10;
const createCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, image } = data
        try {
            const checkCategoryExists = await Category.findOne({
                name: name
            })
            if (checkCategoryExists !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Category already exists!'
                })
            }
            const createCategory = await Category.create({
                name,
                image
            })
            resolve({
                status: 'OK',
                message: 'Category created successfully',
                data: createCategory
            })
        } catch (err) {
            reject(err)
        }
    })
}
const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCategoryExists = await Category.findOne({
                _id: id
            })
            if (checkCategoryExists === null) {
                resolve({
                    status: 'ERR',
                    message: 'Category is not defined!'
                })
            }
            await Category.findByIdAndUpdate(id, data, { new: true })
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
const getDetailCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.findOne({
                _id: categoryId
            })

            if (category === null) {
                resolve({
                    status: 'ERR',
                    message: `The category is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: category
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllCategory = (page = 1, limit = LIMIT_CATEGORY, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : null;
            const totalCategory = await Category.count(searchQuery)
            const allCategory = await Category.find(searchQuery)
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: allCategory,
                totalCategory,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    createCategory, updateCategory, getDetailCategory, getAllCategory
}