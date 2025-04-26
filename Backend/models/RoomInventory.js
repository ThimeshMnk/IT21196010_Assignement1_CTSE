const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  available: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String, // store file path or URL
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Room', roomSchema);
