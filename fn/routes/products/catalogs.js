const express = require('express');
const ProductPropetries = require('../../models/ProductPropetries');
const { catalogValidationRules, validate } = require('../../middleware/validator');

const { Catalogs } = ProductPropetries;

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newCatalog = new Catalogs({
            catalog: req.body.catalog,
            images: req.body.images,
        });
        await newCatalog.save();
        res.status(200).send(newCatalog);
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

router.get('/:name', async (req, res) => {
    const name = req.params;
    try {
        const catalog = await Catalogs.findOne(name).populate('products');
        if (!catalog) {
            throw String('Can not find catalog with such an ID');
        }
        console.log(catalog);
        const { products } = catalog;
        res.status(200).send(products);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
