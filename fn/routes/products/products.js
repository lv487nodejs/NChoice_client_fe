const express = require('express');
const ProductsModels = require('../../models/Product');

const { Products, Catalogs } = ProductsModels;

const router = express.Router();

router.get('/', async (req, res) => {
    const { query } = req;
    try {
        const productsFiltered = await Products.find(query);
        if (productsFiltered.length) {
            res.status(200).send(productsFiltered);
        } else {
            const products = await Products.find();
            res.status(200).send(products);
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.get('/:id', getProduct, (req, res) => {
    console.log(res.product)
    res.status(200).send(res.product);
});

async function getProduct(req, res, next) {
    const { id } = req.params;
    let product;
    try {
        product = await Products.findById(id);
        if (!product) {
            throw { message: 'Can not find product' };
        }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }

    res.product = product;
    next();
}

router.post('/', async (req, res) => {
    try {
        const catalogId = req.body.catalog;

        const catalog = await Catalogs.findOne(catalogId);
        if (!catalog) throw { message: 'Bad catalog name' };

        const product = new Products({
            catalog,
            category: req.body.category,
            brand: req.body.brand,
            title: req.body.title,
            description: req.body.description,
            color: req.body.color,
            images: req.body.images,
            propetries: req.body.propetries,
        });

        const newProduct = await product.save();
        catalog.products.push(product);
        await catalog.save();
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = router;
