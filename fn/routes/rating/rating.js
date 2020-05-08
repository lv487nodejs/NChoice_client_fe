const express = require('express');
const { auth } = require('../../middleware/auth');
const { updateRating } = require('../../controllers/rating/rating');
const router = express.Router();
router
.route('/:id')
.put(auth, updateRating)
module.exports = router;