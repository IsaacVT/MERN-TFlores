const { Router } = require('express');
const { check, } = require('express-validator');
const router = Router();

const { getCartByUser, updateProdsCart, deleteCart, createNewCart } = require('../controllers/cartController');

// Show one data
router.get('/getCartUser/:id', getCartByUser);

// Create new cart
router.post('/createCart', createNewCart);

// Update cart
router.put('/updateCart', updateProdsCart);

// Delete data
router.delete('/deleteCart/:id', deleteCart);

module.exports = router;