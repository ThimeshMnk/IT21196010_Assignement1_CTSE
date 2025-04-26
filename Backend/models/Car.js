const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  plateNumber: { type: String, required: true, unique: true },
  rentPerDay: { type: Number, required: true },
  status: { type: String, enum: ['Available', 'Rented'], default: 'Available' },
  imageUrl: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Car', carSchema);
