const express = require('express');
const { colorValidationRules, validate } = require('../../middleware/validator');
const { auth, authorize } = require('../../middleware/auth');

const {
    createColor,
    getColor,
    getColors,
    updateColor,
    deleteColor,
} = require('../../controllers/products/colors');
const router = express.Router();

router.route('/')
    .get(getColors)
    .post(colorValidationRules(), validate, createColor);

router.route('/:id')
    .get(getColor)
    .put(auth, authorize('admin'), updateColor)
    .delete(auth, authorize('admin'), deleteColor);

module.exports = router;
