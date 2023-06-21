const { validationResult } = require('express-validator');
const Cart = require('../models/cart');

const getCartByUser = async (req, res) => {
    const userId = req.params.id;
    const cart = await Cart.where({ user: userId });
    res.json({ msg: "Cart found", cart: cart });
};

const createNewCart = async (req, res) => {
    const { id } = req.body

    if (id !== undefined || id !== null) {
        const newCart = new Cart({ user: id, products: new Map() });
        await newCart.save();
        res.json(newCart);
    } else {
        res.status(400).json({ status: 'Params error' })
    }
}

const updateProdsCart = async (req, res) => {
    const { user, products } = req.body

    const tmpCart = await Cart.where({ user: user })
    const existCart = tmpCart[0]

    const tmpMap = new Map()
    Object.entries(products).forEach(([key, value]) => {
        tmpMap.set(key, value);
    })

    existCart.products = tmpMap;
    const newCart = existCart;

    await Cart.findByIdAndUpdate(existCart._id, newCart)

    res.json({ msg: 'Cart update' })
};

const deleteCart = async (req, res) => {
    const cart = await Cart.where({ user: req.params.id });
    const exstCart = cart[0]
    await Cart.findByIdAndRemove(exstCart.id);
    res.json({ status: "Cart delete" });
}

module.exports = { getCartByUser, updateProdsCart, deleteCart, createNewCart };