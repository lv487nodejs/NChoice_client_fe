const express = require('express');
const Order = require('../../models/Order');
const { orderValidationRules, validate } = require('../../middleware/validator');

const router = express.Router();

// Create the order
router.post('/', orderValidationRules(), validate, async (req, res) => {
    const {
        orderItems,
        userId,
        date,
        deliveryAddress,
        deliveryType,
        contactPhone,
        paymentMethod,
        status
    } = req.body;
    try {
        const newOrder = new Order({
            orderItems,
            userId,
            date,
            deliveryAddress,
            deliveryType,
            contactPhone,
            paymentMethod,
            status
        });
        await newOrder.save();
        res.status(200).send(newOrder);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get all orders
router.get('/', async (req, res) => {
    let orders;
    try {
            orders = await Order.find();
        if (!orders || orders.length === 0) {
            throw { message: 'orders not found' };
        }
        res.status(200).send(orders);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get the order by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            throw { message: 'Can not find order with such an ID' };
        }
        res.status(200).send(order);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update the order by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let order = await Order.findById(id);
        if (!order) {
            throw { message: 'Can not find order with such an ID' };
        }
        order = await Order.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send(order);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete the order by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Order.findByIdAndDelete({ _id: id });
        if (!response) {
            return res.status(404).send('Order does not exist!');
        }
        res.status(200).send(`Order successfully deleted!`);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
