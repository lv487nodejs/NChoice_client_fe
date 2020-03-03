const express = require('express');
const Colors = require('../../models/Color');
const { colorValidationRules, validate } = require('../../middleware/validator');

const router = express.Router();

router.post('/', colorValidationRules(), validate, async (req, res) => {
    const { color, images } = req.body;
    try {
        const newColor = new Colors({
            color,
            images,
        });
        await newColor.save();
        res.status(200).send(newColor);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/', async (req, res) => {
    const { color } = req.query;
    let colors;
    try {
        // check if object query is not empty
        if (!(Object.entries(req.query).length === 0 && req.query.constructor === Object)) {
            colors = await Colors.find({ color: { $in: color.split(',') } });
        } else {
            colors = await Colors.find();
        }

        if (!colors || colors.length === 0) {
            throw { message: 'Color is not found' };
        }
        res.status(200).send(colors);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const color = await Colors.findById(id);
        if (!color) {
            throw { message: 'Can not find color with such an ID' };
        }
        res.status(200).send(color);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, images } = req.body;
    try {
        const colorToUpdate = await Colors.findById(id);
        if (!colorToUpdate) throw { message: 'Color not found!' }

        if (name) {
            colorToUpdate.color = name;
        }

        if (Array.isArray(images) && images.length) {
            colorToUpdate.images.push(...images);
        }

        await colorToUpdate.save();
        res.status(200).send(colorToUpdate);
    } catch (err) {
        res.status(400).send(err);
    }

});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Colors.findByIdAndDelete({ _id: id });
        if (!response) {
            return res.status(404).send('Color does not exist!');
        }
        res.status(200).send(`Color ${response.color} successfully deleted!`);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
