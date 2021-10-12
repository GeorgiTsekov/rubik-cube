const express = require('express');

const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('../controllers/cubeAccessoryController');
const { isAuth } = require('../middlewares/authMiddleware');

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

const getDeleteCubePage = (req, res) => {
    res.render('cube/delete');
}

const getEditCubePage = (req, res) => {
    res.render('cube/edit');
}

router.get('/create', isAuth, getCreateCubePage);
router.post('/create', isAuth, createCube);
router.get('/:cubeId', getDetails);
router.get('/:cubeId/delete', isAuth, getDeleteCubePage);
router.get('/:cubeId/edit', isAuth, getEditCubePage);

router.use('/:cubeId/accessory', cubeAccessoryController);

module.exports = router;