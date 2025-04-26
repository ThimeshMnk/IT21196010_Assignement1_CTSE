const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {   createRental,getRentals, updateRental, deleteRental,  getMyRentals,  } = require('../controllers/rentalController');
const router = express.Router();

router.post('/', protect, createRental);
router.get('/', protect, isAdmin, getRentals);
router.put('/:id', protect, isAdmin, updateRental);
router.delete('/:id', protect, isAdmin, deleteRental);
router.get('/my', protect, getMyRentals);
module.exports = router;
