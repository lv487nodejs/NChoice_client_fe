const Order = require('../../models/Order');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');

const createOrder = asyncHandler(async (req, res, next) => {
    const {email, orderItems, userId, date, deliveryAddress, deliveryType, contactPhone, paymentMethod, status } = req.body;
    const newOrder = new Order({
        orderItems,
        userId,
        date,
        deliveryAddress,
        deliveryType,
        contactPhone,
        paymentMethod,
        status,
        email
    });
    await newOrder.save();
    res.status(200).send(newOrder);
});

const getOrders = asyncHandler(async (req, res, next) => {
    let orders;
    orders = await Order.find()
        .sort('-date')
        .populate('orderItems.item')
        .populate('userId');

    if (!orders || orders.length === 0) {
        return next(
            new ErrorResponse('Orders not found.', 404)
        );
    }
    res.status(200).send(orders);
});


const getOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id)
        .populate('userId');

    if (!order) {
        return next(
            new ErrorResponse('Order not found.', 404)
        );
    }
    res.status(200).send(order);
});

const updateOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { order } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(id, order);
    if (!updatedOrder) {
        return next(
            new ErrorResponse('Order not found.', 404)
        );
    }
    res.status(200).send(updatedOrder);
});

const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const response = await Order.findByIdAndDelete({ _id: id });
    if (!response) {
        return next(
            new ErrorResponse('Order not found.', 404)
        );
    }
    res.status(200).send('Order successfully deleted!');
});

module.exports = {
    deleteOrder,
    updateOrder,
    getOrder,
    getOrders,
    createOrder,
};
