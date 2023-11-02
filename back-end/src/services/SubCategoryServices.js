const Category = require("../models/CategoryModel")
const SubCategory = require("../models/SubCategoryModel")
const LIMIT_SUBCATEGORY = 10
const createSubCategory = (categoryId, data) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, description } = data
        try {
            const checkSubCategoryExists = await SubCategory.findOne({
                name: name
            })
            const checkCategoryExists = await Category.findOne({
                _id: categoryId
            }
            )
            if (checkSubCategoryExists !== null) {
                resolve({
                    status: 'ERR',
                    message: 'SubCategory already exists!'
                })
            }
            if (!checkCategoryExists) {
                resolve({
                    status: 'ERR',
                    message: 'CategoryId is not correct!'
                })
            }
            if (checkCategoryExists && !checkSubCategoryExists) {
                const createSubCategory = await SubCategory.create({
                    name,
                    image,
                    description,
                    categoryId
                })
                resolve({
                    status: 'OK',
                    message: 'SubCategory created successfully',
                    data: createSubCategory
                })
            }

        } catch (err) {
            reject(err)
        }
    })
}

const updateSubCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkSubCategoryExists = await SubCategory.findOne({
                _id: id
            })
            if (checkSubCategoryExists === null) {
                reject({
                    status: 'ERR',
                    message: 'SubCategory is not defined!'
                })
            }
            await SubCategory.findByIdAndUpdate(id, data, { new: true })
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
const getDetailSubCategory = (subCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const subCategory = await SubCategory.findOne({
                _id: subCategoryId
            })
            if (subCategory === null) {
                resolve({
                    status: 'ERR',
                    message: `The subCategory is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: subCategory
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllSubCategory = (page = 1, limit = LIMIT_SUBCATEGORY, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const conditions = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ]
            };
            const searchQuery = search ? conditions : null;
            const totalSubCategory = await SubCategory.count(searchQuery)
            const allSubCategory = await SubCategory.find(searchQuery)
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: allSubCategory,
                totalSubCategory,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllSubCategoryByCategoryId = (page = 1, limit = LIMIT_SUBCATEGORY, search, categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const conditions = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ],
                categoryId: categoryId,
            };
            const searchQuery = search ? conditions : { categoryId: categoryId };
            const totalSubCategory = await SubCategory.count(searchQuery)
            const allSubCategory = await SubCategory.find(searchQuery)
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: allSubCategory,
                totalSubCategory,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const deleteSubCategory = (subCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {

            await SubCategory.findByIdAndDelete({
                _id: subCategoryId
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
    createSubCategory,
    updateSubCategory, getDetailSubCategory,
    getAllSubCategory, getAllSubCategoryByCategoryId,
    deleteSubCategory

}