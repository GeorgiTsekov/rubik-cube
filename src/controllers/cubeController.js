const express = require('express');
// const validator = require('validator');

const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('../controllers/cubeAccessoryController');
const { isAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

const getCreateCubePage = (req, res) => {
    res.render('cube/create');
};

const createCube = async (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    // if (!validator.isURL(imageUrl)) {
    //     return res.status('400').send('Invalid Email!');
    // }


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

const getDeleteCubePage = async (req, res) => {
    let cube = await cubeService.getCurrent(req.params.cubeId);

    res.render('cube/delete', { ...cube });
}

const postDeleteCubePage = async (req, res) => {
    await cubeService.deleteCurrent(req.params.cubeId);

    res.redirect('/');
}

const getEditCubePage = async (req, res) => {
    let cube = await cubeService.getCurrent(req.params.cubeId);

    res.render('cube/edit', { ...cube });
}

const postEditCubePage = async (req, res) => {
    let updatedCube = await req.body;
    let currentId = req.params.cubeId;
    await cubeService.editCurrent(currentId, updatedCube);

    res.redirect(`/cube/${currentId}`);
}

router.get('/create', isAuth, getCreateCubePage);
router.post('/create', isAuth, createCube);
router.get('/:cubeId', getDetails);
router.get('/:cubeId/delete', isAuth, getDeleteCubePage);
router.post('/:cubeId/delete', isAuth, postDeleteCubePage);
router.get('/:cubeId/edit', isAuth, getEditCubePage);
router.post('/:cubeId/edit', isAuth, postEditCubePage);

router.use('/:cubeId/accessory', cubeAccessoryController);

module.exports = router;