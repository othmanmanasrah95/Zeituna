const express = require('express');
const router = express.Router();
<<<<<<< HEAD
=======
const { register, login, getProfile, updateProfile, connectWallet } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
>>>>>>> 966a4461cccae640258e2b5faddd681047492835

// Import controller functions
const { register, login, logout } = require('../controllers/authController');

// Register
router.post('/register', register);
<<<<<<< HEAD
=======
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/connect-wallet', protect, connectWallet);
>>>>>>> 966a4461cccae640258e2b5faddd681047492835

// Login
router.post('/login', login);

// Logout (Optional)
router.get('/logout', logout);

module.exports = router;
