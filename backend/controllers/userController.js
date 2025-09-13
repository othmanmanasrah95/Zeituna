// controllers/userController.js
const User = require('../models/user');
const TokenBalance = require('../models/tokenBalance');

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // Add more fields as needed

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Admin
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Admin
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    next(error);
  }
};


// Dummy: Get user transaction history
exports.getUserTransactions = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Transaction history fetched',
    data: [
      { id: 'txn1', amount: 50 },
      { id: 'txn2', amount: 100 }
    ]
  });
};

// Get user's token balance
exports.getUserTokenBalance = async (req, res) => {
  try {
    const tokenBalance = await TokenBalance.findOne({ user: req.user._id });
    
    if (!tokenBalance) {
      // Create token balance if it doesn't exist
      const newTokenBalance = new TokenBalance({
        user: req.user._id,
        balance: 0
      });
      await newTokenBalance.save();
      
      return res.status(200).json({
        success: true,
        message: 'Token balance created',
        balance: 0
      });
    }

    res.status(200).json({
      success: true,
      message: 'Token balance fetched',
      balance: tokenBalance.balance,
      transactions: tokenBalance.transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Sync blockchain TUT balance with database
// @route   POST /api/users/sync-tut-balance
// @access  Private
exports.syncTutBalance = async (req, res) => {
  try {
    const { blockchainBalance } = req.body;
    
    if (typeof blockchainBalance !== 'number' || blockchainBalance < 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid blockchain balance provided'
      });
    }
    
    let tokenBalance = await TokenBalance.findOne({ user: req.user._id });
    
    if (!tokenBalance) {
      // Create new token balance record
      tokenBalance = new TokenBalance({
        user: req.user._id,
        balance: 0,
        transactions: []
      });
    }
    
    // Calculate current database balance
    const currentDbBalance = tokenBalance.transactions.reduce((total, transaction) => {
      if (transaction.type === 'reward') {
        return total + transaction.amount;
      } else if (transaction.type === 'redemption') {
        return total - transaction.amount;
      }
      return total;
    }, 0);
    
    // If blockchain balance is higher than database balance, add the difference as a reward
    const balanceDifference = blockchainBalance - currentDbBalance;
    if (balanceDifference > 0) {
      tokenBalance.transactions.push({
        type: 'reward',
        amount: balanceDifference,
        description: 'Blockchain balance sync - tokens from external sources',
        date: new Date()
      });
    }
    
    await tokenBalance.save();
    
    res.json({
      success: true,
      data: {
        message: 'TUT balance synced successfully',
        blockchainBalance,
        databaseBalance: currentDbBalance + balanceDifference,
        syncedAmount: balanceDifference
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Dummy: Get trees the user adopted/planted
exports.getUserTrees = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User trees fetched',
    trees: [
      { name: 'Olive Tree', status: 'Adopted' },
      { name: 'Fig Tree', status: 'Planted' }
    ]
  });
};
