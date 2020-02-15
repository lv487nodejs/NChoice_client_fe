const express = require('express');
const ProductModels = require('../../models/Product');

const { Catalogs } = ProductModels;

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newCatalog = new Catalogs({
            name: req.body.name,
            images: req.body.images,
        });
        await newCatalog.save();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const catalogs = await Catalogs.find();
        res.send(catalogs);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:catalogId', async (req, res) => {
    const id = req.params.catalogId;
    try {
        const catalog = await Catalogs.findById(id);
        if (catalog.length) {
            throw String('Cant find catalog with such an ID');
        }
        res.send(catalog);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
