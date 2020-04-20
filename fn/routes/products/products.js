const express = require('express');
const { productValidationRules, validate } = require('../../middleware/validator');
const { auth, authorize } = require('../../middleware/auth');

const {
    getPrpoducts,
    getProduct,
    getPropetriesById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../../controllers/products/products')

const router = express.Router();

router.route('/')
    .get(getPrpoducts)
    .post(productValidationRules(), validate, createProduct);

router.route('/:id')
    .get(getProduct)
    .put(auth, authorize('admin'), updateProduct)
    .delete(auth, authorize('admin'), deleteProduct);

router.get('/propetries/:id', getPropetriesById);

module.exports = router;
