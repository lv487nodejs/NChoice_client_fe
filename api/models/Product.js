const mongoose = require('mongoose');

const { Schema } = mongoose;

const Propetries = new Schema({
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
    url: String,
});

const Category = new Schema({
    name: { type: String, required: true, unique: true },
    images: [Images],
});

const Catalog = new Schema({
    name: { type: String, required: true, unique: true },
    images: [Images],
});

const Brand = new Schema({
    name: { type: String, required: true, unique: true },
    images: [Images],
});

const Product = new Schema({
    catalogs: { type: Schema.Types.ObjectId, ref: 'Catalog' },
    categories: { type: Schema.Types.ObjectId, ref: 'Category' },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: String,
    images: [Images],
    propetries: [Propetries],
    modified: { type: Date, default: Date.now },
});

const Categories = mongoose.model('Category', Category);
const Catalogs = mongoose.model('Catalog', Catalog);
const Brands = mongoose.model('Brand', Brand);
const Products = mongoose.model('Product', Product);

module.exports = Categories;
module.exports = Catalogs;
module.exports = Brands;
module.exports = Products;
