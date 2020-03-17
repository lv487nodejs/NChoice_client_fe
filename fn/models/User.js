const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserModel = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    tokens: [String],
    wishlist: [String],
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'cart'
    },
    orders: {
        type: Schema.Types.ObjectId, 
        ref: 'order'
    }
});

const Users = mongoose.model('user', UserModel);
module.exports = Users;

