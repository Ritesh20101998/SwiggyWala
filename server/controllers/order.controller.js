const Order = require('../models/order.model');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { customerName, orderItems, totalPrice } = req.body;
    const newOrder = new Order({ customerName, orderItems, totalPrice });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get order details by order ID
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update an existing order by order ID
const updateOrder = async (req, res) => {
  try {
    const { customerName, orderItems, totalPrice } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { customerName, orderItems, totalPrice },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete an order by order ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getOrderDetails,
  updateOrder,
  deleteOrder,
};
