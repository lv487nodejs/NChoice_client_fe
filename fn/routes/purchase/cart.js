const express = require('express');
const Cart = require('../../models/Cart');
const { cartValidationRules, validate } = require('../../middleware/validator');

const router = express.Router();

// create the cart
router.post('/', cartValidationRules(), validate, async (req, res) => {
    const {
        cartItems,
        userId
    } = req.body;
    try {
        const newCart = new Cart({
            cartItems,
            userId
        });
        await newCart.save();
        res.status(200).send(newCart);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get all carts
router.get('/', async (req, res) => {
    let carts;
    try {
        carts = await Cart.find();
        if (!carts || carts.length === 0) {
            throw { message: 'carts not found' };
        }
        res.status(200).send(carts);
    } catch (err) {
        res.status(400).send(err);
    }
});


// Get the cart by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findById(id);
        if (!cart) {
            throw { message: 'Can not find cart with such an ID' };
        }
        res.status(200).send(cart);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update the cart by ID
router.put('/:id', cartValidationRules(), validate, async (req, res) => {
    const { id } = req.params;
    try {
        let cart = await Cart.findById(id);
        if (!cart) {
            throw { message: 'Can not find cart with such an ID' };
        }
        cart = await Cart.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).send("Cart was successfully changed");
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete the cart by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Cart.findByIdAndDelete({ _id: id });
        if (!response) {
            return res.status(404).send('Cart does not exist!');
        }
        res.status(200).send(`Cart successfully deleted!`);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
