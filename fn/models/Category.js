const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    images: [String],
});

const Categories = mongoose.model('category', CategorySchema);

module.exports = Categories;
