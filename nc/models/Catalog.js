const mongoose = require('mongoose');

const { Schema } = mongoose;

const CatalogSchema = new Schema({
    catalog: {
        type: String,
        required: true,
        unique: true
    },
    images: [String],
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'category'
        }
    ],
});

const Catalogs = mongoose.model('catalog', CatalogSchema);

module.exports = Catalogs;
