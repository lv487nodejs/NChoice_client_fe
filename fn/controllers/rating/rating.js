const asyncHandler = require('../../middleware/async');
const Product = require('../../models/Product');
const ErrorResponse = require('../../utils/errorResponse');

const updateRating = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body;
    const productToUpdate = await Product.findByIdAndUpdate(id, rate);

    if (!productToUpdate) {
        return next(new ErrorResponse('Product not found', 404));
    }
    res.status(200).send('rating updated');
})
module.exports = { updateRating };