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
        type: String
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

UserModel.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare( newPassword, this.password)
    } catch {
        throw new Error(error)
    }
}

const Users = mongoose.model('user2', UserModel);
module.exports = Users;

