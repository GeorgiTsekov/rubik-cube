const Accessory = require('../models/Accessory');

async function create(name, imageUrl, description) {
    return Accessory.create({ name, imageUrl, description });
};

async function getAll() {
    return Accessory.find({}).lean();
};

async function getAllWithout(accessoryIds) {
    return Accessory.find({ _id: { $nin: accessoryIds } }).lean();
};

const accessoryService = {
    create,
    getAll,
    getAllWithout,
};

module.exports = accessoryService;