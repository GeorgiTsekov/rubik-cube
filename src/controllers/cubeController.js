const express = require('express');

const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('../controllers/cubeAccessoryController');

const router = express.Router();

const getCreateCubePage = (req, res) => {
    res.render('cube/create');
};

const createCube = async (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    try {
        await cubeService.create(name, description, imageUrl, difficulty);
    
        res.redirect('/');
        
    } catch (error) {
        res.status(400).send(error.message).end();
    }
};

const getDetails = async (req, res) => {
    let cube = await cubeService.getCurrent(req.params.cubeId);
    res.render('cube/details', { ...cube });
};

router.get('/create', getCreateCubePage);
router.post('/create', createCube);
router.get('/:cubeId', getDetails);
router.use('/:cubeId/accessory', cubeAccessoryController);

module.exports = router;