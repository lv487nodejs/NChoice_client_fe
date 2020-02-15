const express = require('express');
const Categories = require('../../models/Product');

const router = express.Router();

router.post('/', async (req, res) => {
    const newCategory = new Categories({
        name: req.body.name,
        images: req.body.name,
    });
    try {
        await newCategory.save();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await Categories.find();
        res.send(categories);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:categoryId', async (req, res) => {
    const id = req.params.categoryId;
    try {
        const category = await Categories.findById(id);
        if (category.length) {
            throw String('Cant find category with such an ID');
        }
        res.send(category);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
