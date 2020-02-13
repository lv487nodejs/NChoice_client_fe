const express = require('express');
const ProductModel = require('../../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = 'Product get OK';
        res.send(product);
    } catch (err) {
        return console.log(err);
    }
});

router.post('/', async (req, res) => {
    const product = new ProductModel({
        name: req.body.name,
        brand: req.body.brand,
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const product = 'Product patch OK';
        console.log(product);
    } catch (err) {
        return console.log(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = 'Product delete OK';
        console.log(product);
    } catch (err) {
        return console.log(err);
    }
});

// //////////////////////

// router.post('/', async (req, res) => {
//     const { name } = req.body;
//     try {
//         let product = await ProductModel.findOne({ name });
//         if (product) {
//             return res.status(400).json({ errors: [{ msg: 'Cloth item already exists' }] });
//         }

//         product = new ProductModel(req.body);

//         await product.save();
//         res.json(product);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

module.exports = router;
