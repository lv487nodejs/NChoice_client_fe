const mongoose = require('mongoose');

const { Schema } = mongoose;

const ColorSchema = new Schema({
    color: {
        type: String,
        required: true,
        unique: true
    },
    images: [String],
});

const Colors = mongoose.model('color', ColorSchema);

module.exports = Colors;
