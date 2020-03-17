const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema({
    cartItems: [{
        productSku: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;
