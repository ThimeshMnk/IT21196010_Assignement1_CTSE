const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/authController');

const router = express.Router();

// Admin Only
router.get('/', protect, isAdmin, getAllUsers);
router.put('/:id', protect, isAdmin, updateUser);
router.delete('/:id', protect, isAdmin, deleteUser);

module.exports = router;
