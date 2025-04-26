const Room = require('../models/RoomInventory');

// @desc Add new room
exports.addRoom = async (req, res) => {
  try {
    const { roomType, price, features, available } = req.body;

    const room = new Room({
      roomType,
      price,
      features: features ? features.split(',') : [],
      available: available === 'true' || available === true,
      image: req.file ? req.file.path : undefined,
    });

    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create room', error: err.message });
  }
};

// @desc Get all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update room
exports.updateRoom = async (req, res) => {
  try {
    const updated = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Delete room
exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
