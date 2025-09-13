const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');
const Tree = require('../models/tree');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      tutUsed = 0,
      notes
    } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Order must contain at least one item'
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        error: 'Shipping address is required'
      });
    }

    // Calculate totals
    let subtotal = 0;
    let tutTotal = 0;
    const processedItems = [];

    for (const item of items) {
      let itemData;
      
      if (item.type === 'product') {
        itemData = await Product.findById(item.item);
      } else if (item.type === 'tree') {
        itemData = await Tree.findById(item.item);
      }

      if (!itemData) {
        return res.status(400).json({
          success: false,
          error: `Item not found: ${item.type} with ID ${item.item}`
        });
      }

      // Check if item has TUT price
      if (itemData.tutPrice) {
        const itemTutTotal = itemData.tutPrice * item.quantity;
        tutTotal += itemTutTotal;
        
        processedItems.push({
          type: item.type,
          item: item.item,
          name: itemData.name,
          image: itemData.images?.[0] || itemData.image || itemData.photo || '/default-product.png',
          quantity: item.quantity,
          price: 0, // Free when using TUT
          tutPrice: itemData.tutPrice,
          total: 0,
          tutTotal: itemTutTotal
        });
      } else {
        const itemTotal = itemData.price * item.quantity;
        subtotal += itemTotal;
        
        processedItems.push({
          type: item.type,
          item: item.item,
          name: itemData.name,
          image: itemData.images?.[0] || itemData.image || itemData.photo || '/default-product.png',
          quantity: item.quantity,
          price: itemData.price,
          total: itemTotal
        });
      }
    }

    // Calculate shipping (free for now)
    const shipping = 0;
    
    // Calculate tax (8% for now, only on ILS purchases)
    const tax = subtotal * 0.08;
    
    // Calculate total
    const totalAmount = subtotal + shipping + tax - tutUsed;

    // Validate TUT balance if purchasing with TUT
    if (tutTotal > 0) {
      const TokenBalance = require('../models/tokenBalance');
      let tokenBalance = await TokenBalance.findOne({ user: req.user._id });
      
      // If no token balance record exists, create one with 0 balance
      if (!tokenBalance) {
        tokenBalance = new TokenBalance({
          user: req.user._id,
          balance: 0,
          transactions: []
        });
        await tokenBalance.save();
      }

      const currentBalance = tokenBalance.transactions.reduce((total, transaction) => {
        if (transaction.type === 'reward') {
          return total + transaction.amount;
        } else if (transaction.type === 'redemption') {
          return total - transaction.amount;
        }
        return total;
      }, 0);

      if (currentBalance < tutTotal) {
        return res.status(400).json({
          success: false,
          error: `Insufficient TUT balance. Required: ${tutTotal}, Available: ${currentBalance}`
        });
      }
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items: processedItems,
      subtotal,
      tutTotal, // Add TUT total
      shipping,
      tax,
      discount: tutUsed,
      totalAmount,
      paymentMethod: tutTotal > 0 ? 'tut_tokens' : paymentMethod,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      tutUsed: tutUsed + tutTotal, // Include both discount and TUT purchase
      notes,
      status: 'pending',
      paymentStatus: 'pending'
    });

    await order.save();

    // Deduct TUT tokens if purchasing with TUT
    if (tutTotal > 0) {
      const TokenBalance = require('../models/tokenBalance');
      let tokenBalance = await TokenBalance.findOne({ user: req.user._id });
      
      // If no token balance record exists, create one with 0 balance
      if (!tokenBalance) {
        tokenBalance = new TokenBalance({
          user: req.user._id,
          balance: 0,
          transactions: []
        });
      }
      
      tokenBalance.transactions.push({
        type: 'redemption',
        amount: tutTotal,
        description: `Purchase: ${processedItems.map(item => item.name).join(', ')}`,
        reference: order._id,
        referenceType: 'Order'
      });
      
      await tokenBalance.save();
    }

    // Populate the order with user and item details
    await order.populate([
      { path: 'user', select: 'name email' },
      { path: 'items.item' }
    ]);

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.item')
      .sort('-createdAt');

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.item');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this order'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment-status
// @access  Private/Admin
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!['pending', 'processing', 'completed', 'failed', 'refunded'].includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payment status'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Check if user owns the order or is admin
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to cancel this order'
      });
    }

    // Only allow cancellation if order is pending or confirmed
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        error: 'Order cannot be cancelled at this stage'
      });
    }

    order.status = 'cancelled';
    await order.save();

    await order.populate('user', 'name email');

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};






