const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserModel = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true,

    },
    local:{
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
            ref: 'cart',
            unique: true,
        },
        orders: {
            type: Schema.Types.ObjectId,
            ref: 'order'
        }
    },
    google: {
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
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
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
            ref: 'cart',
            unique: true,
        },
        orders: {
            type: Schema.Types.ObjectId,
            ref: 'order'
        }
    },
    facebook: {

    },

});

const Users = mongoose.model('user', UserModel);
module.exports = Users;

