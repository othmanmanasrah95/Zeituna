const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price in ILS']
  },
  originalPrice: {
    type: Number,
    default: null
  },
  unit: {
    type: String,
    default: ''
  },
  stockQuantity: {
    type: Number,
    default: 1
  },
  images: [{
    type: String,
    required: [true, 'Please add at least one image']
  }],
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['organic', 'handmade', 'eco-friendly', 'local', 'olive_oil', 'handicraft']
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rewardTUTPercent: {
    type: Number,
    default: 10, // percentage reward
    min: 0,
    max: 100
  },
  tutRewardFixed: {
    type: Number,
    default: 0 // fixed TUT reward if needed
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0
  },
  // Additional fields for detailed view
  features: [String],
  specifications: {
    type: Map,
    of: String
  },
  shipping: {
    free: {
      type: Boolean,
      default: false
    },
    estimatedDays: {
      type: String,
      default: '3-5 business days'
    }
  },
  sustainability: {
    carbonNeutral: {
      type: Boolean,
      default: false
    },
    locallySourced: {
      type: Boolean,
      default: false
    },
    plasticFree: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-calculate average rating
productSchema.pre('save', function (next) {
  if (this.reviews.length > 0) {
    const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
    this.rating = total / this.reviews.length;
  } else {
    this.rating = 0;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
