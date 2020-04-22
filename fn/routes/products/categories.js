const express = require('express');
const { categoryValidationRules, validate } = require('../../middleware/validator');
const { auth, authorize } = require('../../middleware/auth');

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../../controllers/products/categories');

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(categoryValidationRules(), validate, createCategory);

router.route('/:id')
    .get(getCategory)
    .put(auth, authorize('admin'), updateCategory)
    .delete(auth, authorize('admin'), deleteCategory);

module.exports = router;
