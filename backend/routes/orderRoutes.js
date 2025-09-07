const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder
} = require('../controllers/orderController');

// Apply authentication to all order routes
router.use(protect);

// Order routes
router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

// Admin-only routes (these should be moved to admin routes in production)
router.put('/:id/status', updateOrderStatus);
router.put('/:id/payment-status', updatePaymentStatus);

module.exports = router;






