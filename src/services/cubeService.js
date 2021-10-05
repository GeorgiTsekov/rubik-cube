const Cube = require('../models/Cube.js');
const Accessory = require('../models/Accessory');
const accessoryService = require('../services/accessoryService');

const getAll = () => Cube.find({}).lean();

const getCurrent = (id) => Cube.findById(id).populate('accessories').lean();

const create = (name, description, imageUrl, difficulty) => {
    let cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty,
    });

    return cube.save();
};

const search = async (text, from, to) => {
    let result = await getAll();

    if (text) {
        result = result.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));
    }

    if (from) {
        result = result.filter(x => x.difficulty >= from);
    }

    if (to) {
        result = result.filter(x => x.difficulty <= to);
    }

    return result;
};

const attachAccessory = async (cubeId, accessoryId) => {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);

    return cube.save();
}

const cubeService = {
    create,
    getAll,
    getCurrent,
    search,
    attachAccessory,
};

module.exports = cubeService;