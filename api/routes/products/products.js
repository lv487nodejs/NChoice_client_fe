const express = require('express');
const Product = require('../../models/Product');

const router = express.Router();

router.post('/', async (req, res) => {
        const { name } = req.body;
        try {
                let product = await Product.findOne({ name });
                if (product) {
                        return res.status(400).json({ errors: [{ msg: 'Cloth item already exists' }] });
                }

                product = new Product(req.body);

                await product.save();
                res.json(product);
        } catch (error) {
                console.error(error);
                res.status(500).send('Server error');
        }
});

module.exports = router;
