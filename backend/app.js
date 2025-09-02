require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const User = require('./models/user');
const { corsOptions, securityHeaders, apiLimiter } = require('./middleware/security');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');
const treeRoutes = require('./routes/treeRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const discountRoutes = require('./routes/discountRoutes');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Global Middleware
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Error handling for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON parsing error:', err.message);
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON format'
    });
  }
  next();
});
app.use(morgan('dev'));

// Debug middleware to log request bodies
app.use((req, res, next) => {
  if (req.method === 'POST' && req.path.includes('/auth')) {
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.get('Content-Type'));
  }
  next();
});

// Apply rate limiting to all routes
app.use(apiLimiter);

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/trees', treeRoutes);
app.use('/api/land-plots', require('./routes/landPlotRoutes'));
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/discounts', discountRoutes);

// 404 handler
app.use(notFound);

// Error Handler Middleware
app.use(errorHandler);

// TEMP: Route to check if users exist
app.get('/check-users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ count: users.length, users });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch users' });
  }
});


module.exports = app;
