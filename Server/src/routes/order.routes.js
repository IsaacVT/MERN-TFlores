const { Router } = require('express');
const router = Router();
const { showOrders, createOrder, updateOrder, deleteOrder } = require("../controllers/orderController");

// Show orders
router.get('/getOrders', showOrders);

// New order
router.post('/newOrder', createOrder);

// Update order
router.put('/updateOrder', updateOrder);

// Delete order
router.delete('/deleteOrder/:id', deleteOrder);

module.exports = router;