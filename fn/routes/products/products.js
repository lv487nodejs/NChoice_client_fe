const express = require('express');

const Products = require('../../models/Product');
const Catalogs = require('../../models/Catalog');
const Categories = require('../../models/Category');
const Brands = require('../../models/Brand');
const Colors = require('../../models/Color');

const { productValidationRules, validate } = require('../../middleware/validator');

const router = express.Router();

router.get('/', async (req, res) => {
    const { query } = req;

    try {
        const filter = await getFilters(query);
        const products = await Products.find(filter)
            .populate('catalog')
            .populate('category')
            .populate('color')
            .populate('brand');

        if (!products) {
            throw { message: 'Products not found ' };
        }

        const productsToSend = prepareProductsToSend(products);

        res.status(200).send(productsToSend);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Products.findById(id);
        if (!product) throw { message: 'Can not find product' };
        res.status(200).send(product);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.post('/', productValidationRules(), validate, async (req, res) => {
    const { title, description, images, propetries } = req.body;
    try {
        const requestedCatalog = req.body.catalog;
        const catalog = await Catalogs.findOne(requestedCatalog);
        if (!catalog) throw { message: 'Bad catalog name' };

        const requestedCategory = req.body.category;
        let category = await Categories.findOne(requestedCategory);
        if (!category) {
            category = new Categories({
                category: requestedCategory.category,
            });
            category = await category.save();
            catalog.categories.push(category);
            await catalog.save();
        }

        const condition = catalog.categories.findIndex(valueId => valueId === category.id);

        if (condition < 0) {
            catalog.categories.push(category);
            await catalog.save();
        }

        const requestedBrand = req.body.brand;
        let brand = await Brands.findOne(requestedBrand);
        if (!brand) {
            brand = new Brands({
                brand: requestedBrand.brand,
            });
            brand = await brand.save();
        }

        const requestedColor = req.body.color;
        let color = await Colors.findOne(requestedColor);
        if (!color) {
            color = new Colors({
                color: requestedColor.color,
            });
            color = await color.save();
        }

        const product = new Products({
            catalog,
            category,
            brand,
            title,
            description,
            color,
            images,
            propetries,
        });

        const newProduct = await product.save();
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

const getFilters = async query => {
    const { catalog, category, color, brand } = query;
    const filter = {};

    try {
        if (catalog) {
            const catalogItems = await Catalogs.find({ catalog: { $in: catalog.split(',') } });
            catalogItems.forEach((value, i, array) => (array[i] = value.id));
            filter.catalog = { $in: catalogItems };
        }
        if (category) {
            const categoryItems = await Categories.find({ category: { $in: category.split(',') } });
            categoryItems.forEach((value, i, array) => (array[i] = value.id));
            filter.category = { $in: categoryItems };
        }
        if (brand) {
            const brandItems = await Brands.find({ brand: { $in: brand.split(',') } });
            brandItems.forEach((value, i, array) => (array[i] = value.id));
            filter.brand = { $in: brandItems };
        }
        if (color) {
            const colorFilter = await Colors.find({ color: { $in: color.split(',') } });
            colorFilter.forEach((value, i, array) => (array[i] = value.id));
            filter.color = { $in: colorFilter };
        }
    } catch (err) {
        throw { message: err.message };
    }

    return filter;
};

const prepareProductsToSend = products => {
    const productsToSend = products.map(product => {
        const newProduct = {
            id: product.id,
            title: product.title,
            images: product.images,
            description: product.description,
            propetries: product.propetries,
            modified: product.modified,
            catalog: product.catalog.catalog,
            category: product.category.category,
            color: product.color.color,
            brand: product.brand.brand,
        };
        return newProduct;
    });
    return productsToSend;
};

module.exports = router;
