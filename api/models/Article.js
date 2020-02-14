const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
});

const ArticleModel = mongoose.model('article', ArticleSchema);
module.exports = ArticleModel;
