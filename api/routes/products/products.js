const express = require('express');
const ProductModel = require('../../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        return res.send('Products get OK');
    } catch (err) {
        return console.log(err);
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        let product = await ProductModel.findOne({ name });
        if (product) {
            return res.status(400).json({ errors: [{ msg: 'Cloth item already exists' }] });
        }

        product = new ProductModel(req.body);

        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
