const InventoryServices = require('../services/InventoryServices')

const getDetailInventory = async (req, res) => {
    const inventoryId = req.params.id;
    try {
        if (!inventoryId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The inventory is required'
            })
        }
        const response = await InventoryServices.getDetailInventory(inventoryId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

const getAllInventory = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const response = await InventoryServices.getAllInventory(page, limit, search)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
module.exports = {
    getDetailInventory, getAllInventory
}