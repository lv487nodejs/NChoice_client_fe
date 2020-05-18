const mongoose = require('mongoose');

const {Schema} = mongoose;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: Date,
    default: Date.now
  },

});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
