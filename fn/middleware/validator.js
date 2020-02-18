const { body, validationResult } = require('express-validator');

const userValidationRules = () => [body('email', 'Email is required').isEmail(), body('password').isLength({ min: 6 })];

const userLoginValidationRules = () => [
    body('email', 'Email is required').isEmail(),
    body('password').isLength({ min: 6 }),
];

const catalogValidationRules = () => [
    body('catalog', 'catalog name is required')
        .notEmpty()
        .isString(),
];

const categoryValidationRules = () => [
    body('category', 'category name is required')
        .notEmpty()
        .isString(),
];

const brandValidationRules = () => [
    body('brand', 'brand name is required')
        .notEmpty()
        .isString(),
];

const colorValidationRules = () => [
    body('color', 'color name is required')
        .notEmpty()
        .isString(),
];

const propetriesValidationRules = () => [
    body('size', 'Size is required')
        .notEmpty()
        .isString(),
    body('available', 'Available is required')
        .notEmpty()
        .isNumeric(),
    body('sku', 'sku is required')
        .notEmpty()
        .isString(),
    body('price', 'Price is required')
        .notEmpty()
        .isNumeric({ min: 1, max: 10000 }),
];

const productValidationRules = () => [
    body('title', 'title is required')
        .notEmpty()
        .isString(),
    body('description', 'description is required')
        .notEmpty()
        .isString(),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};

module.exports = {
    userValidationRules,
    catalogValidationRules,
    propetriesValidationRules,
    productValidationRules,
    userLoginValidationRules,
    brandValidationRules,
    colorValidationRules,
    categoryValidationRules,
    validate,
};
