const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    orderId: String,
    orderItems: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
        quantity: Number,
        required: true
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryType: {
        type: String,
        required: true,
        enum: [
            "Currier",
            "Post",
            "Delivery servise"]
    },
    contactPhone: {
        quantity: Number,
        required: true
    },
    PaymentMethod: {
        type: String,
        required: true,
        enum: [
            "Credit Card",
            "Pay Pal",
            "Cash",
            "Google pay",
            "Amazon Pay",
            'Apple Pay']
    }
});

const Orders = mongoose.model('order', OrderSchema);

module.exports = Orders;