const express = require('express');
const Products = require('../../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
    const { query } = req;
    if (query) {
        try {
            const products = await Products.find(query);
            if (products.length) {
                res.json(products);
            } else {
                res.status(500).json({ message: `Bad query:`, query });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        try {
            const products = await Products.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
});

router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
});


router.post('/', async (req, res) => {
    try {
        const product = new Products({
            brand: req.body.brand,
            title: req.body.title,
            description: req.body.description,
            categories: req.body.categories,
            catalogs: req.body.catalogs,
            variants: req.body.variants,
        });
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', getProduct, async (req, res) => {
    if (req.body.name) {
        res.product.name = req.body.name;
    }
    if (req.body.brand) {
        res.product.brand = req.body.brand;
    }
    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: 'Deleted Product' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getProduct(req, res, next) {
    let product;
    try {
        product = await Products.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.product = product;
    next();
}

// //////////////////////

// router.post('/', async (req, res) => {
//     const { name } = req.body;
//     try {
//         let product = await Products.findOne({ name });
//         if (product) {
//             return res.status(400).json({ errors: [{ msg: 'Cloth item already exists' }] });
//         }

//         product = new Products(req.body);

//         await product.save();
//         res.json(product);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

module.exports = router;
