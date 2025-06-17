const express = require('express');
const router = express.Router();
const {
  getOverview,
  getUsers,
  updateUserRole,
  getProducts,
  getTrees,
  getTransactions,
  getTokenBalances
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// Protect all admin routes
router.use(protect);
router.use(authorize('admin'));

router.get('/overview', getOverview);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.get('/products', getProducts);
router.get('/trees', getTrees);
router.get('/transactions', getTransactions);
router.get('/token-balances', getTokenBalances);

module.exports = router; 