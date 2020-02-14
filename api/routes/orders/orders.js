const express = require('express');
const OrderModel = require('../../models/Order');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const orders = await OrderModel.find()
        res.send(orders);
    } catch (err) {
        return console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params.id
    try {
        const order = await OrderModel.findById(id)
        res.send(order);
    } catch (err) {
        return console.log(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const order = new OrderModel({
            name: req.body.name
        });
        order.save();
        res.send(order);
    } catch (err) {
        return console.log(err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const order = 'Order patch OK';
        res.send(order);
    } catch (err) {
        return console.log(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const order = 'Order delete OK';
        res.send(order);
    } catch (err) {
        return console.log(err);
    }
});

module.exports = router;
