const express = require('express');
const Catalogs = require('../../models/Catalog');
const { catalogValidationRules, validate } = require('../../middleware/validator');
const { auth, authorize } = require('../../middleware/auth');

const {
    getCatalog,
    getCatalogs,
    createCatalog,
    updateCatalog,
    deleteCatalog,
} = require('../../controllers/products/catalogs');

const router = express.Router();

router.route('/')
    .get(getCatalogs)
    .post(catalogValidationRules(), validate, createCatalog);

router.route('/:id')
    .get(getCatalog)
    .put(auth, authorize('admin'), updateCatalog)
    .delete(auth, authorize('admin'), deleteCatalog);

module.exports = router;
