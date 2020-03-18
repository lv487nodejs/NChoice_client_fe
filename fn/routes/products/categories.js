const express = require('express');
const Categories = require('../../models/Category');
const { categoryValidationRules, validate } = require('../../middleware/validator');

const router = express.Router();

router.post('/', categoryValidationRules(), validate, async (req, res) => {
    const { category, images } = req.body;
    try {
        const newCategory = new Categories({
            category,
            images,
        });
        await newCategory.save();
        res.status(200).send(newCategory);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/', async (req, res) => {
    const { category } = req.query;
    let categories;
    try {
        // check if object query is not empty
        if (!(Object.entries(req.query).length === 0 && req.query.constructor === Object)) {
            categories = await Categories.find({ category: { $in: category.split(',') } });
        } else {
            categories = await Categories.find();
        }

        if (!categories || categories.length === 0) {
            throw { message: 'Category is not found' };
        }
        res.status(200).send(categories);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Categories.findById(id);
        if (!category) {
            throw { message: 'Can not find category with such an ID' };
        }
        res.status(200).send(category);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, images } = req.body;
    try {
        const categoryToUpdate = await Categories.findById(id);
        if (!categoryToUpdate) throw { message: 'Category not found!' }

        if (name) {
            categoryToUpdate.category = name;
        }

        if (Array.isArray(images) && images.length) {
            categoryToUpdate.images.push(...images);
        }

        await categoryToUpdate.save();
        res.status(200).send(categoryToUpdate);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Categories.findByIdAndDelete({ _id: id });
        if (!response) {
            return res.status(404).send('Category does not exist!');
        }
        res.status(200).send(`Category ${response.category} successfully deleted!`);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
