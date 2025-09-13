const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Order identification
  orderNumber: {
    type: String,
    unique: true,
    required: false // Auto-generated in pre-save hook
  },

  // Customer information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Order items
  items: [{
    type: {
      type: String,
      enum: ['product', 'tree'],
      required: true
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'items.type',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    tutPrice: {
      type: Number,
      default: null // TUT price if applicable
    },
    total: {
      type: Number,
      required: true
    },
    tutTotal: {
      type: Number,
      default: 0 // TUT total if applicable
    }
  }],

  // Pricing breakdown
  subtotal: {
    type: Number,
    required: true
  },
  
  tutTotal: {
    type: Number,
    default: 0 // Total amount in TUT tokens
  },
  
  shipping: {
    type: Number,
    default: 0
  },
  
  tax: {
    type: Number,
    default: 0
  },
  
  discount: {
    type: Number,
    default: 0
  },
  
  totalAmount: {
    type: Number,
    required: true
  },

  // Payment information
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'paypal', 'crypto', 'bank_transfer', 'tut_tokens']
  },
  
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  
  paymentId: {
    type: String // External payment processor ID
  },

  // Order status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },

  // Shipping information
  shippingAddress: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      default: 'United States'
    }
  },

  // Billing information (optional - can be same as shipping)
  billingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },

  // Tracking information
  trackingNumber: String,
  carrier: String,
  estimatedDelivery: Date,
  actualDelivery: Date,

  // Notes and comments
  notes: String,
  adminNotes: String,

  // Token information (for TUT token system)
  tutUsed: {
    type: Number,
    default: 0
  },
  
  tokenReward: {
    type: Number,
    default: 0
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Always generate order number for new orders
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
  }
  
  // Update updatedAt timestamp
  this.updatedAt = new Date();
  
  // Calculate totals
  if (this.isModified('items')) {
    this.subtotal = this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    // Calculate total amount
    this.totalAmount = this.subtotal + this.shipping + this.tax - this.discount;
  }
  
  next();
});

// Index for better query performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);






