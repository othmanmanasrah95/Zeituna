const mongoose = require('mongoose');

const tokenBalanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  transactions: [{
    type: {
      type: String,
      enum: ['purchase', 'reward', 'transfer', 'redemption'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    description: String,
    reference: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'transactions.referenceType'
    },
    referenceType: {
      type: String,
      enum: ['Transaction', 'Tree']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Update balance when transactions are added
tokenBalanceSchema.pre('save', function(next) {
  if (this.isModified('transactions')) {
    this.balance = this.transactions.reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);
    this.lastUpdated = Date.now();
  }
  next();
});

module.exports = mongoose.model('TokenBalance', tokenBalanceSchema); 