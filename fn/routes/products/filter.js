const express = require('express');
const ProductsModels = require('../../models/Product');

const { Catalogs } = ProductsModels;

const router = express.Router();

router.get('/categories', async (req, res) => {
    const { query } = req;
    const catalog = await Catalogs.find(query).populate().distinct('category')
    console.log(catalog)
    // const categories = catalog.distinct('category');
    res.send("hello");
});

module.exports = router;
