const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = function (username, password, repeatPassword) {
    if (password !== repeatPassword) {
        throw 'Password must be equal to RepeatPassword';
    }

    return bcrypt.hash(password, 10)
        .then(hash => User.create({ username, password: hash }));

};