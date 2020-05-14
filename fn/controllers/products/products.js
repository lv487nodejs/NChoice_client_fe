const Products = require('../../models/Product');
const Catalogs = require('../../models/Catalog');
const Categories = require('../../models/Category');
const Brands = require('../../models/Brand');
const Colors = require('../../models/Color');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');
const mongoose = require('mongoose');
const {
    prepareProductsToUpdate,
    prepareProductsToSend,
    getSort,
    getFilters,
    searchConfig,
    isNotBlank,
} = require('../../utils/productUtils');

const getPrpoducts = asyncHandler(async (req, res) => {
    const { query } = req;
    const { searchTerm } = query;
    let { currentpage, postsperpage } = query;

    currentpage = currentpage || 0;
    postsperpage = postsperpage || 15;
    const skip = currentpage * postsperpage;
    const projection = {};

    const filter = await getFilters(query);
    const sort = await getSort(query);

    if (isNotBlank(searchTerm)) {
        filter.$or = searchConfig(searchTerm);
        projection.score = { $meta: 'textScore' };
    }

    const products = await Products.find(filter, projection)
        .sort(sort)
        .skip(+skip)
        .limit(+postsperpage)
        .populate('catalog')
        .populate('category')
        .populate('color')
        .populate('brand');

    if (!products) {
        return next(
            new ErrorResponse('Product not found.', 404)
        );
    }

    const productsToSend = prepareProductsToSend(products);
    const foundProductsNumber = await Products.find(filter).countDocuments();

    const pagesCount = Math.ceil(foundProductsNumber / postsperpage);
    res.status(200).send({ products: productsToSend, pagesCount, foundProductsNumber });
});

const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Products.findById(id)
        .populate('catalog')
        .populate('category')
        .populate('color')
        .populate('brand');
    if (!product) {
        return next(
            new ErrorResponse('Product not found.', 404)
        );
    }
    const poructToSend = prepareProductsToSend([product]);
    res.status(200).send(poructToSend);
});

const getPropetriesById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const productPropetrie = await Products.findOne({ 'propetries._id': id })
        .select('propetries');

    if (!productPropetrie) {
        return next(
            new ErrorResponse('Product propetries not found.', 404)
        );
    }
    const newProp = productPropetrie.propetries.filter((propetry) => propetry._id.toString() === id);
    res.send(newProp);
});

const createProduct = asyncHandler(async (req, res) => {
    const { title, description, images, propetries, price, mrsp } = req.body;

    propetries.forEach(propetrie => {
        propetrie.available = parseInt(propetrie.available);
    });
    const requestedCatalog = req.body.catalog;
    const catalog = await Catalogs.findOne({ catalog: requestedCatalog });
    if (!catalog) {
        return next(
            new ErrorResponse('Catalog does not exist.', 404)
        );
    }

    const requestedCategory = req.body.category;
    const category = await Categories.findOne({ category: requestedCategory });
    if (!category) {
        return next(
            new ErrorResponse('Category does not exist.', 404)
        );
    }

    const requestedBrand = req.body.brand;
    const brand = await Brands.findOne({ brand: requestedBrand });
    if (!brand) {
        return next(
            new ErrorResponse('Brand does not exist.', 404)
        );
    }

    const requestedColor = req.body.color;
    const color = await Colors.findOne({ color: requestedColor });
    if (!color) {
        return next(
            new ErrorResponse('Color does not exist.', 404)
        );
    }

    const product = new Products({
        catalog,
        category,
        brand,
        title,
        description,
        color,
        price: parseFloat(price),
        mrsp: parseFloat(mrsp),
        images,
        propetries,
    });

    const newProduct = await product.save();
    res.status(201).send(newProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { product } = req.body;
    const productToUpdate = await prepareProductsToUpdate(product);
    const updatedProduct = await Products.findByIdAndUpdate(id, productToUpdate)
        .populate('catalog')
        .populate('category')
        .populate('color')
        .populate('brand');
    if (!updatedProduct) {
        return next(
            new ErrorResponse('Product not found.', 404)
        );
    }
    const productToSend = prepareProductsToSend([updatedProduct]);
    res.status(200).send(productToSend);
});


const deleteProduct = asyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const response = await Products.findByIdAndDelete({ _id: id });
        if (!response) {
            return next(
                new ErrorResponse('Product not found.', 404)
            );
        }
        res.status(200).send(`Product ${response.title} successfully deleted!`);
    }
);

module.exports = {
    getPrpoducts,
    getProduct,
    getPropetriesById,
    createProduct,
    updateProduct,
    deleteProduct,
};
