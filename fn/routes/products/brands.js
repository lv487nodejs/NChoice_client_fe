const express = require('express');
const { brandValidationRules, validate } = require('../../middleware/validator');

const Brands = require('../../models/Brand');
const { auth, authorize } = require('../../middleware/auth');

const router = express.Router();

router.post('/', brandValidationRules(), validate, auth, authorize('admin'), async (req, res) => {
    const { brand, images } = req.body;
    try {
        const newBrand = new Brands({
            brand,
            images,
        });
        await newBrand.save();
        res.status(200).send(newBrand);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/', async (req, res) => {
    const { brand } = req.query;
    let brands;
    try {
        // check if object query is not empty
        if (!(Object.entries(req.query).length === 0 && req.query.constructor === Object)) {
            brands = await Brands.find({ brand: { $in: brand.split(',') } });
        } else {
            brands = await Brands.find();
        }

        if (!brands || brands.length === 0) {
            throw { message: 'brand not found' };
        }
        res.status(200).send(brands);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await Brands.findById(id);
        if (!brand) {
            throw { message: 'Can not find brand with such an ID' };
        }
        res.status(200).send(brand);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { brand } = req.body;
    try {
        const updatedBrand = await Brands.findByIdAndUpdate(id, brand);
        res.status(200).send(updatedBrand);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Brands.findByIdAndDelete({ _id: id });
        if (!response) {
            throw { message: 'Brand does not exist!' };
        }
        res.status(200).send(`Brand ${response.brand} successfully deleted!`);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
