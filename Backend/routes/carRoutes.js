const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { addCar, getCars, getCarById, updateCar, deleteCar } = require('../controllers/carController');

const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', protect, isAdmin, addCar);
router.put('/:id', protect, isAdmin, updateCar);
router.delete('/:id', protect, isAdmin, deleteCar);

module.exports = router;
