const express = require('express');
// const validator = require('validator');

const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('../controllers/cubeAccessoryController');
const { isAuth } = require('../middlewares/authMiddleware');
const { isOwnCube } = require('../middlewares/cubeAuthMiddleware');

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
        await cubeService.create(name, description, imageUrl, difficulty, req.user._id);
        res.redirect('/');

    } catch (error) {
        // res.status(400).send(error.message).end();
        res.locals.error = error.message;
        // let errors = Object.keys(error.errors).map(x => error.errors[x].message);
        // res.locals.errors = errors;

        res.render('cube/create')
    }
};

const getDetails = async (req, res) => {
    let cube = await cubeService.getCurrent(req.params.cubeId);
    let currentUser = req.user;
    let isOwn = false;

    if (!currentUser) {
        isOwn = false;
    } else {
        isOwn = cube.creator == currentUser._id;
    }

    res.render('cube/details', { ...cube, isOwn, currentUser });
};

const getDeleteCubePage = async (req, res) => {
    // let cube = await cubeService.getCurrent(req.params.cubeId);

    res.render('cube/delete', req.cube);
}

const postDeleteCubePage = async (req, res) => {
    await cubeService.deleteCurrent(req.params.cubeId);

    res.redirect('/');
}

const getEditCubePage = async (req, res) => {
    // let cube = await cubeService.getCurrent(req.params.cubeId);

    res.render('cube/edit', req.cube);
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
router.get('/:cubeId/delete', isAuth, isOwnCube, getDeleteCubePage);
router.post('/:cubeId/delete', isAuth, isOwnCube, postDeleteCubePage);
router.get('/:cubeId/edit', isAuth, isOwnCube, getEditCubePage);
router.post('/:cubeId/edit', isAuth, isOwnCube, postEditCubePage);

router.use('/:cubeId/accessory', isAuth, cubeAccessoryController);

module.exports = router;