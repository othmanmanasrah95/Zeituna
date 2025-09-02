const User = require('../models/user');
const Product = require('../models/product');
const Tree = require('../models/tree');
const LandPlot = require('../models/landPlot');
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

// @desc    Create new product
// @route   POST /api/admin/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      seller: req.user._id // Set the current admin as the seller
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      data: product
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

// @desc    Create new tree
// @route   POST /api/admin/trees
// @access  Private/Admin
exports.createTree = async (req, res) => {
  try {
    const treeData = {
      ...req.body,
      farmer: req.user._id // Set the current admin as the farmer
    };

    const tree = await Tree.create(treeData);

    res.status(201).json({
      success: true,
      data: tree
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

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('seller', 'name email');

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update tree
// @route   PUT /api/admin/trees/:id
// @access  Private/Admin
exports.updateTree = async (req, res) => {
  try {
    const tree = await Tree.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('farmer', 'name email');

    if (!tree) {
      return res.status(404).json({
        success: false,
        error: 'Tree not found'
      });
    }

    res.json({
      success: true,
      data: tree
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete tree
// @route   DELETE /api/admin/trees/:id
// @access  Private/Admin
exports.deleteTree = async (req, res) => {
  try {
    const tree = await Tree.findByIdAndDelete(req.params.id);

    if (!tree) {
      return res.status(404).json({
        success: false,
        error: 'Tree not found'
      });
    }

    res.json({
      success: true,
      message: 'Tree deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update transaction
// @route   PUT /api/admin/transactions/:id
// @access  Private/Admin
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: transaction
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

// @desc    Get all land plots
// @route   GET /api/admin/land-plots
// @access  Private/Admin
exports.getLandPlots = async (req, res) => {
  try {
    const landPlots = await LandPlot.find()
      .populate('farmer', 'name email')
      .populate('adoptions.user', 'name');

    res.json({
      success: true,
      count: landPlots.length,
      data: landPlots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new land plot
// @route   POST /api/admin/land-plots
// @access  Private/Admin
exports.createLandPlot = async (req, res) => {
  try {
    const landPlotData = {
      ...req.body,
      farmer: req.user._id // Set the current admin as the farmer
    };

    const landPlot = await LandPlot.create(landPlotData);

    res.status(201).json({
      success: true,
      data: landPlot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update land plot
// @route   PUT /api/admin/land-plots/:id
// @access  Private/Admin
exports.updateLandPlot = async (req, res) => {
  try {
    const landPlot = await LandPlot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('farmer', 'name email');

    if (!landPlot) {
      return res.status(404).json({
        success: false,
        error: 'Land plot not found'
      });
    }

    res.json({
      success: true,
      data: landPlot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete land plot
// @route   DELETE /api/admin/land-plots/:id
// @access  Private/Admin
exports.deleteLandPlot = async (req, res) => {
  try {
    const landPlot = await LandPlot.findByIdAndDelete(req.params.id);

    if (!landPlot) {
      return res.status(404).json({
        success: false,
        error: 'Land plot not found'
      });
    }

    res.json({
      success: true,
      message: 'Land plot deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 