const Rental = require('../models/Rental');
const Car = require('../models/Car');


exports.createRental = async (req, res) => {
    const userId = req.user._id;
    const { carId, startDate, endDate } = req.body;
  
    try {
      // 1.1 Fetch car & check availability
      const car = await Car.findById(carId);
      if (!car) return res.status(404).json({ message: 'Car not found' });
      if (car.status !== 'Available') {
        return res.status(400).json({ message: 'Car not available' });
      }
  
      // 1.2 Calculate cost
      const start = new Date(startDate);
      const end   = new Date(endDate);
      const days  = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      const totalCost = days * car.rentPerDay;
  
      // 1.3 Create rental record
      const rental = await Rental.create({
        car: carId,
        user: userId,
        startDate: start,
        endDate: end,
        totalCost
      });
  
      // 1.4 Mark the car as rented
      car.status = 'Rented';
      await car.save();
  
      res.status(201).json(rental);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Get all rentals (admin)
exports.getRentals = async (req, res) => {
  const rentals = await Rental.find()
    .populate('car','carName plateNumber')
    .populate('user','name email');
  res.json(rentals);
};

exports.getMyRentals = async (req, res) => {
    try {
      const userId = req.user._id;
      const rentals = await Rental.find({ user: userId })
        .populate('car', 'carName brand model year plateNumber rentPerDay imageUrl')
        .sort({ createdAt: -1 });
      res.json(rentals);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Update rental status
exports.updateRental = async (req, res) => {
    const { status, startDate, endDate } = req.body;
    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      { status, startDate, endDate },
      { new: true }
    );
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
  
    // ✔️ Sync the car’s status
    const car = await Car.findById(rental.car);
    if (status === 'Active' && car.status !== 'Rented') {
      car.status = 'Rented';
    }
    if ((status === 'Completed' || status === 'Cancelled') && car.status !== 'Available') {
      car.status = 'Available';
    }
    await car.save();
  
    res.json(rental);
  };

// Delete/cancel a rental
exports.deleteRental = async (req, res) => {
  const rental = await Rental.findByIdAndDelete(req.params.id);
  if (!rental) return res.status(404).json({ message:'Not found' });
  res.json({ message:'Rental removed' });
};
