const express = require('express');
const { cubes } = require('../models/Cube.js');
const cubeService = require('../services/cubeService.js');

const router = express.Router();

const home = async (req, res) => {
    let cubes = await cubeService.getAll();

    res.render('index', { cubes });
};

const about = (req, res) => {
    res.render('about');
}

const search = async (req, res) => {
    let search = req.query.search;
    let from = parseInt(req.query.from);
    let to = parseInt(req.query.to);

    let cubes = await cubeService.search(search, from, to);

    res.render('index', {
        title: 'SEARCH',
        search,
        from,
        to,
        cubes
    });
}

router.get('/', home);
router.get('/about', about);
router.get('/search', search);

module.exports = router;