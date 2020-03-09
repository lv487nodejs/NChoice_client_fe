const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema({
    cartItems: { 
        type: [String],
        sku: { 
            type: Schema.Types.ObjectId,
            ref: 'brand' },
        count: {
            type: Number
        }
    },
    
});

const Carts = mongoose.model('cart', CartSchema);

module.exports = Carts;