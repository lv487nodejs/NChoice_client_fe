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
    // password: {
    //     type: String,
    //     minlength: 6,
    //     required: true,
    // },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    // confirmedEmail: {
    //     type: Boolean,
    //     default: false,
    // },
    // emailToken: {
    //     type: String,
    //     required: true,
    // },
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
    },
    googleID: String,
    facebookID: String

    // method:{
    //     type: String,
    //     enum: ['local', 'google', 'facebook']
    //     },
    // google: {
    //     id: { type:String },
    //     email: {
    //         type: String,
    //         lowercase: true
    //     }
    // },
    // facebook: {
    //     id: { type:String },
    //     email: {
    //         type: String,
    //         lowercase: true
    //     }
    // }

});

// UserModel.methods.isValidPassword = async function(newPassword) {
//     try {
//         return await bcrypt.compare( newPassword, this.password)
//     } catch {
//         throw new Error(error)
//     }
// }

const Users = mongoose.model('user2', UserModel);
module.exports = Users;

