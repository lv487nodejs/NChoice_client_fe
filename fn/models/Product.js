const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImagesModel = new Schema({
    url: String,
});

const CatalogModel = new Schema({
    name: { type: String, required: true, unique: true },
    images: [ImagesModel],
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
});

const PropetriesModel = new Schema({
    size: {
        type: [Number, String],
        enum: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true,
    },
    available: { type: Number, required: true, min: 0, max: 100 },
    sku: {
        type: String,
        required: true,
        validate: [/[a-zA-Z0-9]/, 'Product sku should have letters and numbers'],
        unique: true,
    },
    mrsp: { type: Number, min: 0 },
    price: { type: Number, required: true, min: 0 },
});

const ProductModel = new Schema({
    catalog: { type: Schema.Types.ObjectId, ref: 'catalog' },
    category: { type: String, enum: ['Dresses', 'Sweaters', 'Jeans', 'T-Shirts', 'Shoes', 'Hoodies'], required: true },
    brand: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, enum: ['Red', 'Black', 'Blue', 'White', 'Green', 'Yellow'], required: true },
    images: [ImagesModel],
    propetries: [PropetriesModel],
    modified: { type: Date, default: Date.now },
});

const Catalogs = mongoose.model('catalog', CatalogModel);
const Products = mongoose.model('product', ProductModel);

module.exports = { Products, Catalogs };
