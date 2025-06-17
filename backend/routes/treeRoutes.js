const express = require('express');
const router = express.Router();
const {
  getTrees,
  getTree,
  createTree,
  updateTree,
  deleteTree,
  adoptTree,
  addTreeUpdate
} = require('../controllers/treeController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getTrees)
  .post(protect, authorize('farmer', 'admin'), createTree);

router.route('/:id')
  .get(getTree)
  .put(protect, authorize('farmer', 'admin'), updateTree)
  .delete(protect, authorize('farmer', 'admin'), deleteTree);

router.post('/:id/adopt', protect, adoptTree);
router.post('/:id/updates', protect, authorize('farmer', 'admin'), addTreeUpdate);

module.exports = router; 