const express = require('express');
const Brands = require('../../models/Product');

const router = express.Router();

router.post('/', async (req, res) => {
    const newBrand = new Brands({
        name: req.body.name,
        images: req.body.name,
    });
    try {
        await newBrand.save();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const brands = await Brands.find();
        res.send(brands);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:brandId', async (req, res) => {
    const id = req.params.brandId;
    try {
        const brand = await Brands.findById(id);
        if (brand.length) {
            throw String('Cant find brand with such an ID');
        }
        res.send(brand);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
