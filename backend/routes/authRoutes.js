const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, connectWallet } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Import controller functions
const { register, login, logout } = require('../controllers/authController');

// Register
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/connect-wallet', protect, connectWallet);

// Login
router.post('/login', login);

// Logout (Optional)
router.get('/logout', logout);

module.exports = router;
