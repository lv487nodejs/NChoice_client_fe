const express = require('express');
const Products = require('../../models/Product');
const ProductPropetries = require('../../models/ProductPropetries');
const { productValidationRules, validate } = require('../../middleware/validator');

const { Catalogs, Categories, Brands, Colors } = ProductPropetries;

const router = express.Router();

router.get('/', async (req, res) => {
    const { query } = req;
    const { catalog, category, color, brand } = query;
    const filter = {};

    try {
        if (catalog) {
            const catalogItem = await Catalogs.find({ catalog });
            filter.catalog = catalogItem[0].id;
        }
        if (category) {
            const categotyItem = await Categories.find({ category });
            filter.category = categotyItem[0].id;
        }
        if (brand) {
            const brandItem = await Brands.find({ brand });
            filter.brand = brandItem[0].id;
        }
        if (color) {
            const colorItem = await Colors.find({ color });
            filter.color = colorItem[0].id;
        }

        const products = await Products.find(filter)
            .populate('catalog')
            .populate('category')
            .populate('color')
            .populate('brand');
        if (!products) {
            throw { message: 'Products not found ' };
        }

        res.status(200).send(products);
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

router.post('/', async (req, res) => {
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
            title: req.body.title,
            description: req.body.description,
            color,
            images: req.body.images,
            propetries: req.body.propetries,
        });

        const newProduct = await product.save();
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;
