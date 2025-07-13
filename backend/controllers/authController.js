const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER CONTROLLER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user and let pre-save hash password
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      }
    });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Logout
exports.logout = (req, res) => {
  res.status(200).json({ success: true, message: 'User logged out (dummy endpoint)' });
};
