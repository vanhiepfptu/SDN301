const Category = require("../models/CategoryModel")
const Inventory = require("../models/InventoryModel")
const Product = require("../models/ProductModel")
const SubCategory = require("../models/SubCategoryModel")
const LIMIT_PRODUCT = 10
const createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, price, quantity, image, description,
                subCategoryId, inventoryId } = data
            const checkSubCategoryExists = await SubCategory.findOne({
                _id: subCategoryId
            })
            const checkInvetoryExist = await Inventory.findOne({
                _id: inventoryId
            })
            const productExists = await Product.findOne({
                inventory: inventoryId
            })
            if (!checkSubCategoryExists) {
                resolve({
                    status: 'ERR',
                    message: "SubCategoryId is not defined"
                })
            }
            if (!checkInvetoryExist) {
                resolve({
                    status: 'ERR',
                    message: "InventoryId is not defined"
                })
            }
            if (checkSubCategoryExists && checkInvetoryExist) {
                if (quantity > checkInvetoryExist.quantity) {
                    resolve({
                        status: 'ERR',
                        message: "Quantity exceeds quantity in Inventory "
                    })
                } else {
                    if (productExists) {
                        await Product.findByIdAndUpdate(productExists._id, {
                            quantity: productExists?.quantity + quantity,
                        }, { new: true })
                    } else {
                        await Product.create({
                            name,
                            price,
                            quantity,
                            image,
                            description,
                            subCategoryId,
                            categoryId: checkSubCategoryExists.categoryId,
                            inventory: checkInvetoryExist._id
                        })
                    }
                    await Inventory.findByIdAndUpdate(checkInvetoryExist._id, {
                        quantity: checkInvetoryExist?.quantity - quantity,
                    }, { new: true })
                    resolve({
                        status: 'OK',
                        message: 'Product created successfully',
                    })
                }
            }
        } catch (err) {
            reject(err)
        }
    })
}
const updateProduct = (id, data) => {
    const { inventoryId, subCategoryId, quantity } = data
    return new Promise(async (resolve, reject) => {
        try {
            const checkProductExists = await Product.findOne({
                _id: id
            })
            if (checkProductExists === null) {
                resolve({
                    status: 'ERR',
                    message: 'Product is not defined!'
                })
            }
            const checkSubCategoryExists = await SubCategory.findOne({
                _id: subCategoryId
            })
            if (!checkSubCategoryExists) {
                resolve({
                    status: 'ERR',
                    message: "SubCategory is not defined"
                })
            }
            const checkInvetoryExist = await Inventory.findOne({
                _id: inventoryId
            })
            if (!checkInvetoryExist) {
                resolve({
                    status: 'ERR',
                    message: "Inventory is not defined"
                })
            }
            const inventoryUpdate = await Inventory.findByIdAndUpdate(checkInvetoryExist._id, {
                quantity: checkInvetoryExist?.quantity + checkProductExists.quantity
            }, { new: true })
            if (quantity > inventoryUpdate.quantity) {
                resolve({
                    status: 'ERR',
                    message: "Quantity exceeds quantity in Inventory "
                })
            } else {
                await Inventory.findByIdAndUpdate(checkInvetoryExist._id, {
                    quantity: checkInvetoryExist?.quantity + checkProductExists.quantity - quantity,
                }, { new: true })
                await Product.findByIdAndUpdate(checkProductExists._id, data, { new: true })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}
const getDetailProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: productId
            })
                .populate('subCategoryId')
                .populate({
                    path: 'subCategoryId',
                    populate: {
                        path: 'categoryId',
                    }
                })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: `The product is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllProduct = (page = 1, limit = LIMIT_PRODUCT, search) => {
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
            const totalProduct = await Product.count(searchQuery)
            const allProduct = await Product.find(searchQuery)
                .populate('subCategoryId')
                .populate({
                    path: 'subCategoryId',
                    populate: {
                        path: 'categoryId',
                    }
                })
            resolve({
                status: 'OK',
                data: allProduct,
                totalProduct,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: productId
            })
            const inventory = await Inventory.findOne({
                _id: product.inventory
            })
            await Product.findByIdAndDelete({
                _id: productId
            })
            await Inventory.findByIdAndUpdate(inventory._id, {
                quantity: inventory.quantity + product.quantity
            }, { new: true })
            resolve({
                status: 'OK',
                messages: "Delete Successfully"
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllProductBySubCategoryId = (page = 1, limit = LIMIT_PRODUCT, search, subCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const conditions = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                ],
                subCategoryId: subCategoryId,
            };
            const searchQuery = search ? conditions : { subCategoryId: subCategoryId };
            const totalProduct = await Product.count(searchQuery)
            const allProductBySubCategoryId = await Product.find(searchQuery)
                .skip(skipNumber)
                .limit(limit)
                .populate({
                    path: 'subCategoryId',
                    populate: {
                        path: 'categoryId',
                    }
                })
            resolve({
                status: 'OK',
                data: allProductBySubCategoryId,
                totalProduct,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllProductByCategoryId = (page = 1, limit = LIMIT_PRODUCT, search, categoryId) => {
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
            const totalProduct = await Product.count(searchQuery)
            const allProductByCategoryId = await Product.find(searchQuery)
                .skip(skipNumber)
                .limit(limit)
                .populate({
                    path: 'subCategoryId',
                    populate: {
                        path: 'categoryId',
                    }
                })
            resolve({
                status: 'OK',
                data: allProductByCategoryId,
                totalProduct,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    createProduct, updateProduct,
    getDetailProduct, getAllProduct, deleteProduct,
    getAllProductBySubCategoryId, getAllProductByCategoryId
}