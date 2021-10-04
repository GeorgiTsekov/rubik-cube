const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image Url is required!'],
        validate: [/^https?:\/\/.+/i, 'Invalid image url!']
    },
    description: {
        type: String,
        required: true,
        maxlength: 300,
    },
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;