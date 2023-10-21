const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
orderRouter.post('/orders', orderController.createOrder);

// Get order details by order ID
orderRouter.get('/orders/:orderId', orderController.getOrderDetails);

// Update an existing order by order ID
orderRouter.put('/orders/:orderId', orderController.updateOrder);

// Delete an order by order ID
orderRouter.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;
