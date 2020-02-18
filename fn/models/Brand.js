const mongoose = require('mongoose');

const { Schema } = mongoose;

const BrandSchema = new Schema({
    brand: { type: String, required: true, unique: true },
    images: [String],
});

const Brands = mongoose.model('brand', BrandSchema);

module.exports = Brands;
