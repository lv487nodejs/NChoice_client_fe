const mongoose = require('mongoose');

const { Schema } = mongoose;

const Sizes = new Schema({
    size: { type: String, required: true },
    available: { type: Number, required: true, min: 0, max: 100 },
    sku: {
        type: String,
        required: true,
        validate: [/[a-zA-Z0-9]/, 'Product sku should have letters and numbers'],
    },
    mrsp: { type: Number, required: true },
    price: { type: Number, required: true, min: 0 },
});

const Images = new Schema({
    url: { type: String, default: '/image/img.jpg' },
});

const Variants = new Schema({
    color: String,
    sizes: [Sizes],
});

const Categories = new Schema({
    name: String,
});

const Catalogs = new Schema({
    name: String,
});

const Brands = new Schema({
    name: String,
});

const Product = new Schema({
    brand: [Brands],
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [Images],
    categories: [Categories],
    catalogs: [Catalogs],
    variants: [Variants],
    modified: { type: Date, default: Date.now },
});

const Products = mongoose.model('product', Product);
module.exports = Products;
