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
        minlength: 6,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    confirmedEmail: {
        type: Boolean,
        default: false,
    },
    emailToken: {
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
        cartProducts: Array,
        cartNumbers: {
            type: Number,
            default: 0,
        },
    },
    orders: {
        type: Schema.Types.ObjectId,
        ref: 'order'
    }
});

const Users = mongoose.model('user', UserModel);
module.exports = Users;

