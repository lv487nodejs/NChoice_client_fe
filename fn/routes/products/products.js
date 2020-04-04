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

    let { currentpage, postsperpage } = query;
    currentpage = currentpage || 0;
    postsperpage = postsperpage || 15;
    let skip = currentpage * postsperpage;
    const { sortbyprice } = query;

    try {
        const filter = await getFilters(query);
        const projection = await getProjection(query);
        const sort = await getSort(query);
        const products = await Products.find(filter, projection)
            .sort(sort)
            .skip(+skip)
            .limit(+postsperpage)
            .sort({ price: sortbyprice })
            .populate('catalog')
            .populate('category')
            .populate('color')
            .populate('brand');

        if (!products) {
            throw { message: 'Products not found ' };
        }
        const productsToSend = prepareProductsToSend(products);
        const foundProductsNumber = await Products.find(filter).count() ;

        if (!foundProductsNumber) {
            throw { message: 'Products not found ' };
        }
        const pagesCount = Math.ceil(foundProductsNumber / postsperpage);
        res.status(200).send({ products: productsToSend, pagesCount, foundProductsNumber });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Products.findById(id)
            .populate('catalog')
            .populate('category')
            .populate('color')
            .populate('brand');
        if (!product) throw { message: 'Can not find product' };
        const poructToSend = prepareProductsToSend([product]);
        res.status(200).send(poructToSend);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

router.post('/', productValidationRules(), validate, async (req, res) => {
    const { title, description, images, propetries, price, mrsp } = req.body;

    propetries.forEach(propetrie => {
        propetrie.available = parseInt(propetrie.available);
    });

    try {
        const requestedCatalog = req.body.catalog;
        const catalog = await Catalogs.findOne({ catalog: requestedCatalog });
        if (!catalog) throw { message: 'Bad catalog name' };

        const requestedCategory = req.body.category;
        const category = await Categories.findOne({ category: requestedCategory });
        if (!category) throw { message: 'Bad category name' };

        const requestedBrand = req.body.brand;
        const brand = await Brands.findOne({ brand: requestedBrand });
        if (!brand) throw { message: 'Bad brand name' };

        const requestedColor = req.body.color;
        const color = await Colors.findOne({ color: requestedColor });
        if (!color) throw { message: 'Bad color name' };

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
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { product } = req.body;

    try {
        const productToUpdate = await prepareProductsToUpdate(product);
        const updatedProduct = await Products.findByIdAndUpdate(id, productToUpdate)
            .populate('catalog')
            .populate('category')
            .populate('color')
            .populate('brand');
        const productToSend = prepareProductsToSend([updatedProduct]);
        res.status(200).send(productToSend);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Products.findByIdAndDelete({ _id: id });
        if (!response) {
            return res.status(404).send('Product does not exist!');
        }
        res.status(200).send(`Product ${response.title} successfully deleted!`);
    } catch (err) {
        res.status(400).send(err);
    }
});

const getFilters = async query => {
    const { catalog, category, color, brand, searchTerm } = query;
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
        if (isNotBlank(searchTerm)) {
            filter.$text = { $search: searchTerm.trim() };
        }
    } catch (err) {
        throw { message: err.message };
    }

    return filter;
};

const getProjection = async query => {
    const { searchTerm } = query;
    const projection = {};

    if (isNotBlank(searchTerm)) {
        // how much each product is relevant to searchTerm
        projection.score = { $meta: 'textScore' };
    }
    return projection;
};

const getSort = async query => {
    const { searchTerm } = query;
    const sort = {};

    if (isNotBlank(searchTerm)) {
        // sort by relevance
        sort.score = { $meta: 'textScore' };
    }
    return sort;
};

const prepareProductsToSend = products => {
    const productsToSend = products.map(product => {
        const newProduct = {
            id: product.id,
            title: product.title,
            images: product.images,
            description: product.description,
            propetries: product.propetries,
            price: product.price,
            mrsp: product.mrsp,
        };

        if (product.brand) newProduct.brand = product.brand.brand;
        if (product.catalog) newProduct.catalog = product.catalog.catalog;
        if (product.category) newProduct.category = product.category.category;
        if (product.color) newProduct.color = product.color.color;
        return newProduct;
    });
    return productsToSend;
};

const prepareProductsToUpdate = async product => {
    const { brand, color, category, catalog } = product;

    if (product.price) product.price = parseFloat(product.price);
    if (product.mrsp) product.mrsp = parseFloat(product.mrsp);

    if (product.brand) {
        const brandToSave = await Brands.findOne({ brand });
        product.brand = brandToSave._id;
    }

    if (product.catalog) {
        const catalogToSave = await Catalogs.findOne({ catalog });
        product.catalog = catalogToSave._id;
    }

    if (product.category) {
        const categoryToSave = await Categories.findOne({ category });
        product.category = categoryToSave._id;
    }

    if (product.color) {
        const colorToSave = await Colors.findOne({ color });
        product.color = colorToSave._id;
    }
    return product;
};

const isNotBlank = str => !(!str || str.trim().length === 0);

module.exports = router;
