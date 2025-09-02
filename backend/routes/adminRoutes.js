const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getOverview,
  getUsers,
  updateUserRole,
  deleteUser,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getTrees,
  createTree,
  updateTree,
  deleteTree,
  getLandPlots,
  createLandPlot,
  updateLandPlot,
  deleteLandPlot,
  getTransactions,
  updateTransaction,
  getTokenBalances
} = require('../controllers/adminController');

// Apply authentication and admin authorization to all admin routes
router.use(protect);
router.use(authorize('admin'));

// Dashboard routes
router.get('/overview', getOverview);

// User management routes
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Product management routes
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Tree management routes
router.get('/trees', getTrees);
router.post('/trees', createTree);
router.put('/trees/:id', updateTree);
router.delete('/trees/:id', deleteTree);

// Land plot management routes
router.get('/land-plots', getLandPlots);
router.post('/land-plots', createLandPlot);
router.put('/land-plots/:id', updateLandPlot);
router.delete('/land-plots/:id', deleteLandPlot);

// Transaction management routes
router.get('/transactions', getTransactions);
router.put('/transactions/:id', updateTransaction);

// Token balance management routes
router.get('/token-balances', getTokenBalances);

// TEMPORARY TEST ROUTE (protected)
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: '✅ [adminRoute] route is working!',
    user: req.user.name,
    role: req.user.role
  });
});

module.exports = router;
