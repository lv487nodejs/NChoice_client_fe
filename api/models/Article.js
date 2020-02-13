const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const ArticleModel = mongoose.model('article', ArticleSchema);
module.exports = ArticleModel;
