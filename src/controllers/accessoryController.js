const router = require('express').Router();

const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('accessory/create')
});

router.post('/create', async (req, res) => {
    let { name, imageUrl, description } = req.body;

    try {
        await accessoryService.create(name, imageUrl, description);

        res.redirect('/');

    } catch (error) {
        res.status(400).render('accessory/create', { error: error.message });
    }
})

module.exports = router;