const Catalogs = require('../../models/Catalog');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');

const createCatalog = asyncHandler(async (req, res, next) => {
    const { catalog, images, categories } = req.body;
    try {
        const newCatalog = new Catalogs({
            catalog,
            categories,
            images,
        });
        await newCatalog.save();
        res.status(200).send(newCatalog);
    } catch (err) {
        res.status(500).send(err);
    }
})

const getCatalogs = asyncHandler(async (req, res, next) => {
    const { catalog } = req.query;
    let catalogs;
    // check if object query is not empty
    if (!(Object.entries(req.query).length === 0 && req.query.constructor === Object)) {
        catalogs = await Catalogs.find({ catalog: { $in: catalog.split(',') } }).populate('categories');
    } else {
        catalogs = await Catalogs.find().populate('categories');
    }

    if (!catalogs || catalogs.length === 0) {
        return next(
            new ErrorResponse('Catalog not found.', 404)
        );
    }
    res.status(200).send(catalogs);
});


const getCatalog = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const catalog = await Catalogs.findById(id);
    if (!catalog) {
        return next(
            new ErrorResponse('Catalog not found.', 404)
        );
    }
    res.status(200).send(catalog);
});

const updateCatalog = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { catalog } = req.body;
    const updatedCatalog = await Catalogs.findByIdAndUpdate(id, catalog);
    if (!updateCatalog) {
        return next(
            new ErrorResponse('Catalog not found.', 404)
        );
    }
    res.status(200).send(updatedCatalog);
});

const deleteCatalog = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const response = await Catalogs.findByIdAndDelete({ _id: id });
    if (!response) {
        return next(
            new ErrorResponse('Catalog not found.', 404)
        );
    }
    res.status(200).send(`Catalog ${response.catalog} successfully deleted!`);
});

module.exports = {
    getCatalog,
    getCatalogs,
    createCatalog,
    updateCatalog,
    deleteCatalog,
};
