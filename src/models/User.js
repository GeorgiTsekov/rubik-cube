const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required!'],
        maxlength: 12,
        minlength: 3,
    },
    password: {
        type: String,
        required: [true, 'password is required!'],
    },
});

const User = mongoose.model('User', accessorySchema);

module.exports = User;