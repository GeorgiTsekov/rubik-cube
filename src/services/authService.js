// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { jwtSign } = require('../utils/jwtUtils');
const { SECRET } = require('../constants');

exports.register = function (username, password, repeatPassword) {
    if (password !== repeatPassword) {
        throw { message: 'Password must be equal to Re-Password' }
    }

    // return bcrypt.hash(password, 10)
    //     .then(hash => User.create({ username, password: hash }));

    return User.create({ username, password });
};

exports.login = async function (username, password) {
    // return User.findByUsername(username)
    //     .then(user => {
    //         return Promise.all([bcrypt.compare(password, user.password)], user)
    //     })
    //     .then(([isValid, user]) => {
    //         if (isValid) {
    //             return user;
    //         } else {
    //             throw { message: 'Cannot find username or password!' }
    //         }
    //     })
    let user = await User.findByUsername(username);
    if (!user) {
        throw { message: 'Cannot find username or password!' }
    }
    let isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        return user;
    } else {
        throw { message: 'Cannot find username or password!' }
    }
}

exports.createToken = function (user) {
    let payload = {
        _id: user._id,
        username: user.username,
    }

    return jwtSign(payload, SECRET);
};
