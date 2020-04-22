const express = require('express');
const { brandValidationRules, validate } = require('../../middleware/validator');

const { auth, authorize } = require('../../middleware/auth');

const {
    getBrand,
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
} = require('../../controllers/products/brands');

const router = express.Router();

router.route('/')
    .get(getBrands)
    .post(brandValidationRules(), validate, createBrand);

router.route('/:id')
    .get(getBrand)
    .put(auth, authorize('admin'), updateBrand)
    .delete(auth, authorize('admin'), deleteBrand);

module.exports = router;
