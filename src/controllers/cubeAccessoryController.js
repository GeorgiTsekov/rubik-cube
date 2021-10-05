const router = require('express').Router({ mergeParams: true });

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/add', async (req, res) => {
    let cube = await cubeService.getCurrent(req.params.cubeId);
    let accessories = await accessoryService.getAll();

    res.render('cube/accessory/add', { cube, accessories });
});

router.post('/add', async (req, res) => {
    const cubeId = req.params.cubeId;
    const accessory = req.body.accessory;

    await cubeService.attachAccessory(cubeId, accessory);

    res.redirect(`/cube/${cubeId}`);
});

module.exports = router;