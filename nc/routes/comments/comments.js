const express = require('express');

const {
    getComment,
    getComments,
    createComment,
    updateComment,
    deleteComment,
} = require('../../controllers/comments/comments');

const router = express.Router();

router.route('/')
    .get(getComments)
    .post(createComment);

router.route('/:id')
    .get(getComment)
    .put(updateComment)
    .delete(deleteComment);

module.exports = router;
