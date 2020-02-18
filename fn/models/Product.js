const mongoose = require('mongoose');

const { Schema } = mongoose;

const PropetriesSchema = require('./ProductPropetries');

const ProductSchema = new Schema({
    catalog: { type: Schema.Types.ObjectId, ref: 'catalog' },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    brand: { type: Schema.Types.ObjectId, ref: 'brand' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: Schema.Types.ObjectId, ref: 'color' },
    images: [String],
    propetries: [PropetriesSchema],
    modified: { type: Date, default: Date.now },
});

const Products = mongoose.model('product', ProductSchema);

module.exports = Products;
