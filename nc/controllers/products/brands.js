const Brands = require('../../models/Brand');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');

const createBrand = asyncHandler(async (req, res, next) => {
    const { brand, images } = req.body;
    try {
        const newBrand = new Brands({
            brand,
            images,
        });
        await newBrand.save();
        res.status(200).send(newBrand);
    } catch (err) {
        res.status(500).send(err);
    }
});

const getBrands = asyncHandler(async (req, res, next) => {
    const { brand } = req.query;
    let brands;
    // check if object query is not empty
    if (!(Object.entries(req.query).length === 0 && req.query.constructor === Object)) {
        brands = await Brands.find({ brand: { $in: brand.split(',') } });
    } else {
        brands = await Brands.find();
    }

    if (!brands || brands.length === 0) {
        return next(
            new ErrorResponse('Brand not found.', 404)
        );
    }
    res.status(200).send(brands);
});

const getBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await Brands.findById(id);
    if (!brand) {
        return next(
            new ErrorResponse('Brand not found.', 404)
        );
    }
    res.status(200).send(brand);
});

const updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { brand } = req.body;
    const updatedBrand = await Brands.findByIdAndUpdate(id, brand);
    if (!updatedBrand) {
        return next(
            new ErrorResponse('Brand not found.', 404)
        );
    }
    res.status(200).send(updatedBrand);
});

const deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const response = await Brands.findByIdAndDelete({ _id: id });
    if (!response) {
        return next(
            new ErrorResponse('Brand not found.', 404)
        );
    }
    res.status(200).send(`Brand ${response.brand} successfully deleted!`);
});

module.exports = {
    getBrand,
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
};
