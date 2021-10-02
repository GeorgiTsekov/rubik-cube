const Cube = require('../models/Cube.js');

const getAll = () => Cube.find({}).lean();

const getCurrent = (id) => Cube.findById(id);

const create = (name, description, imageUrl, difficulty) => {
    let cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty,
    });

    return cube.save();
};

const search = (text, from, to) => {
    let result = getAll();

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
}

const cubeService = {
    create,
    getAll,
    getCurrent,
    search,
};

module.exports = cubeService;