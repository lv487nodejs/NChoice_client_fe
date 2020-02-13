const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;
