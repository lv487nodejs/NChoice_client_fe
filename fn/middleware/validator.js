const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('firstName', 'Last name is required').notEmpty().isString(),
        body('lastName', 'Last name is required').notEmpty().isString(),
        body('email', 'Email is required').isEmail(),
        body('password').isLength({ min: 6 }),
    ]
}

const catalogValidationRules = () => {
    return [
        body('name', 'name is required').notEmpty().isString(),
    ]
}

const propetriesValidationRules = () => {
    return [
        body('size', 'Size is required').notEmpty(),
        body('available', 'Available is required').notEmpty().isNumeric(),
        body('sku', 'sku is required').notEmpty().isString(),
        body('price', 'Price is required').notEmpty().isNumeric({ min: 1, max: max }),

    ]
}

const productValidationRules = () => {
    return [
        body('category', 'category is required').notEmpty().isString(),
        body('brand', 'brand is required').notEmpty().isString(),
        body('title', 'title is required').notEmpty().isString(),
        body('description', 'description is required').notEmpty().isString(),
        body('color', 'color is required').notEmpty().isString(),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
}

module.exports = {
    userValidationRules,
    catalogValidationRules,
    propetriesValidationRules,
    productValidationRules,
    validate
};
