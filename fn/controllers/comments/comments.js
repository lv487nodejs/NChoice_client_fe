const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');
const Comment = require('../../models/Comment');

const getComments = asyncHandler(async (req, res) => {
  const {query} = req;
  let {productId} = query;

  const filter = {};
  if (productId) {
    filter.productId = {$eq: productId};
  }
  const comments = await Comment.find(filter)
    .populate('user');
  res.status(200).send(comments);
});

const getComment = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const comment = await Comment.findById(id).populate('user');
  if (!comment) {
    return next(
      new ErrorResponse('Comment not found.', 404)
    );
  }
  res.status(200).send(comment);
});


const createComment = asyncHandler(async (req, res) => {
  const comment = new Comment(req.body);
  const newComment = await comment.save();
  res.status(201).send(newComment);
});

const updateComment = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const comment = req.body;
  const updatedComment = await Comment.findByIdAndUpdate(id, comment).populate('user');
  if (!updatedComment) {
    return next(
      new ErrorResponse('Comment not found.', 404)
    );
  }
  res.status(200).send(updatedComment);
});


const deleteComment = asyncHandler(
  async (req, res) => {
    const {id} = req.params;
    const response = await Comment.findByIdAndDelete({_id: id});
    if (!response) {
      return next(
        new ErrorResponse('Comment not found.', 404)
      );
    }
    res.status(200).send(`Comment ${id} successfully deleted!`);
  }
);

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
