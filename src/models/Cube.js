const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 300,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\/.+/i, 'Invalid image url!']
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;