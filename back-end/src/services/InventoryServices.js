const Inventory = require("../models/InventoryModel");
const LIMIT_INVENTORY = 10;
const getDetailInventory = (inventoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const detailInventory = await Inventory.findOne({
                _id: inventoryId
            })

            if (detailInventory === null) {
                resolve({
                    status: 'ERR',
                    message: `The Inventory is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: detailInventory
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllInventory = (page = 1, limit = LIMIT_INVENTORY, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const conditions = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { unit: { $regex: search, $options: 'i' } },
                ]
            };
            const searchQuery = search ? conditions : null;
            const totalInventory = await Inventory.count(searchQuery)
            const allInventory = await Inventory.find(searchQuery)
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: allInventory,
                totalInventory,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    getDetailInventory, getAllInventory
}