const mongoose = require('mongoose');

const { Schema } = mongoose;

const CatalogSchema = new Schema({
    catalog: { type: String, required: true, unique: true },
    images: [String],
    categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
});

const CategorySchema = new Schema({
    category: { type: String, required: true, unique: true },
    images: [String],
});

const BrandSchema = new Schema({
    brand: { type: String, required: true, unique: true },
    images: [String],
});

const ColorSchema = new Schema({
    color: { type: String, required: true, unique: true },
    images: [String],
});

const PropetriesSchema = new Schema({
    size: {
        type: [String],
        enum: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
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

const Catalogs = mongoose.model('catalog', CatalogSchema);
const Categories = mongoose.model('category', CategorySchema);
const Brands = mongoose.model('brand', BrandSchema);
const Colors = mongoose.model('color', ColorSchema);

module.exports = { Catalogs, Categories, Brands, Colors, PropetriesSchema };
