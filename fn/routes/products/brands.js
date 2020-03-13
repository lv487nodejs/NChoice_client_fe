const express = require('express');
const { brandValidationRules, validate } = require('../../middleware/validator');

const Brands = require('../../models/Brand');

const router = express.Router();

router.post('/', brandValidationRules(), validate, async (req, res) => {
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
    const { name, images } = req.body;
    try {
        const brandToUpdate = await Brands.findById(id);
        if (!brandToUpdate) throw { message: 'Brand not found!' }

        if (name) {
            brandToUpdate.brand = name;
        }

        if (Array.isArray(images) && images.length) {
            brandToUpdate.images.push(...images);
        }

        await brandToUpdate.save();
        res.status(200).send(brandToUpdate);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Brands.findByIdAndDelete({ _id: id });
        if (!response) {
            return res.status(404).send('Brand does not exist!');
        }
        res.status(200).send(`Brand ${response.brand} successfully deleted!`);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
