const Categories = require('../../models/Category');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');

const createCategory = asyncHandler(async (req, res, next) => {
    const { category, images } = req.body;
    const newCategory = new Categories({
        category,
        images,
    });
    await newCategory.save();
    res.status(200).send(newCategory);
});

const getCategories = asyncHandler(async (req, res, next) => {
    const { category } = req.query;
    let categories;
    // check if object query is not empty
    if (!(Object.entries(req.query).length === 0 && req.query.constructor === Object)) {
        categories = await Categories.find({ category: { $in: category.split(',') } });
    } else {
        categories = await Categories.find();
    }

    if (!categories || categories.length === 0) {
        return next(
            new ErrorResponse('Category not found.', 404)
        );
    }
    res.status(200).send(categories);
});

const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Categories.findById(id);
    if (!category) {
        return next(
            new ErrorResponse('Category not found.', 404)
        );
    }
    res.status(200).send(category);
});

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, images } = req.body;
    const categoryToUpdate = await Categories.findById(id);
    if (!categoryToUpdate) {
        return next(
            new ErrorResponse('Category not found.', 404)
        );
    }

    if (name) {
        categoryToUpdate.category = name;
    }

    if (Array.isArray(images) && images.length) {
        categoryToUpdate.images.push(...images);
    }

    await categoryToUpdate.save();
    res.status(200).send(categoryToUpdate);
});

const deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const response = await Categories.findByIdAndDelete({ _id: id });
    if (!response) {
        return next(
            new ErrorResponse('Category not found.', 404)
        );
    }
    res.status(200).send(`Category ${response.category} successfully deleted!`);
});

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
};
