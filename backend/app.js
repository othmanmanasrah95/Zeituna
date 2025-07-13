const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');
const treeRoutes = require('./routes/treeRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/trees', treeRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

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
