const express = require('express');
const router = express.Router();

// Import controller functions
const { register, login, logout } = require('../controllers/authController');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Logout (Optional)
router.get('/logout', logout);

module.exports = router;
