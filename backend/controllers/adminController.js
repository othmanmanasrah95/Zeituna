const User = require('../models/user');
const Product = require('../models/product');
const Tree = require('../models/tree');
const Transaction = require('../models/transaction');
const TokenBalance = require('../models/tokenBalance');

// @desc    Get dashboard overview
// @route   GET /api/admin/overview
// @access  Private/Admin
exports.getOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalTrees = await Tree.countDocuments();
    const totalTransactions = await Transaction.countDocuments();

    const recentTransactions = await Transaction.find()
      .sort('-createdAt')
      .limit(5)
      .populate('user', 'name email');

    const recentTrees = await Tree.find()
      .sort('-createdAt')
      .limit(5)
      .populate('farmer', 'name');

    const recentProducts = await Product.find()
      .sort('-createdAt')
      .limit(5)
      .populate('seller', 'name');

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalProducts,
          totalTrees,
          totalTransactions
        },
        recent: {
          transactions: recentTransactions,
          trees: recentTrees,
          products: recentProducts
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('adoptedTrees')
      .populate('orders');

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin', 'farmer'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private/Admin
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('seller', 'name email')
      .populate('reviews.user', 'name');

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all trees
// @route   GET /api/admin/trees
// @access  Private/Admin
exports.getTrees = async (req, res) => {
  try {
    const trees = await Tree.find()
      .populate('farmer', 'name email')
      .populate('adopters', 'name');

    res.json({
      success: true,
      count: trees.length,
      data: trees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all transactions
// @route   GET /api/admin/transactions
// @access  Private/Admin
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('user', 'name email')
      .populate('items.item');

    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get token balances
// @route   GET /api/admin/token-balances
// @access  Private/Admin
exports.getTokenBalances = async (req, res) => {
  try {
    const tokenBalances = await TokenBalance.find()
      .populate('user', 'name email');

    res.json({
      success: true,
      count: tokenBalances.length,
      data: tokenBalances
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 