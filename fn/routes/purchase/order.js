const express = require('express');
const { orderValidationRules, validate } = require('../../middleware/validator');
const { auth, authorize } = require('../../middleware/auth');
const {
    deleteOrder,
    updateOrder,
    getOrder,
    getOrders,
    createOrder,
} = require('../../controllers/purchase/orders');

const router = express.Router();

router
    .route('/')
    .get(auth, authorize('admin', 'user'), getOrders)
    .post(orderValidationRules(), validate, createOrder);

router
    .route('/:id')
    .get(auth, authorize('admin', 'user'), getOrder)
    .put(auth, authorize('admin'), updateOrder)
    .delete(auth, authorize('admin'), deleteOrder);

module.exports = router;
