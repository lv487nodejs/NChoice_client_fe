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
    const { catalog } = req.query;
    let catalogs;
    try {
        if (catalog) {
            catalogs = await Catalogs.find({ catalog });
        } else {
            catalogs = await Catalogs.find();
        }

        if (!catalogs) {
            return res.status(404).send('Catalog not found')
        }
        res.send(catalogs);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const catalog = await Catalogs.findById(id);
        if (!catalog) {
            return res.status(404).send('Can not find catalog with such an ID');
        }
        res.status(200).send(catalog);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
