const express = require('express');
const router = express.Router();

// TEMPORARY TEST ROUTE
router.get('/test', (req, res) => {
  res.json({ success: true, message: '✅ [ProductRoute] route is working!' });
});

module.exports = router;
