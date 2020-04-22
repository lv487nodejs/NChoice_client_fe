const Colors = require('../../models/Color');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');

const createColor = asyncHandler(async (req, res, next) => {
    const { color, images } = req.body;
    const newColor = new Colors({
        color,
        images,
    });
    await newColor.save();
    res.status(200).send(newColor);
});

const getColors = asyncHandler(async (req, res, next) => {
    const { color } = req.query;
    let colors;
    // check if object query is not empty
    if (!(Object.entries(req.query).length === 0 && req.query.constructor === Object)) {
        colors = await Colors.find({ color: { $in: color.split(',') } });
    } else {
        colors = await Colors.find();
    }

    if (!colors || colors.length === 0) {
        return next(
            new ErrorResponse('Color not found.', 404)
        );
    }
    res.status(200).send(colors);
});

const getColor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const color = await Colors.findById(id);
    if (!color) {
        return next(
            new ErrorResponse('Color not found.', 404)
        );
    }
    res.status(200).send(color);
});

const updateColor = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, images } = req.body;
    const colorToUpdate = await Colors.findById(id);
    if (!colorToUpdate) {
        return next(
            new ErrorResponse('Color not found.', 404)
        );
    }

    if (name) {
        colorToUpdate.color = name;
    }

    if (Array.isArray(images) && images.length) {
        colorToUpdate.images.push(...images);
    }

    await colorToUpdate.save();
    res.status(200).send(colorToUpdate);
});

const deleteColor = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const response = await Colors.findByIdAndDelete({ _id: id });
    if (!response) {
        return next(
            new ErrorResponse('Color not found.', 404)
        );
    }
    res.status(200).send(`Color ${response.color} successfully deleted!`);
});

module.exports = {
    createColor,
    getColor,
    getColors,
    updateColor,
    deleteColor,
};
