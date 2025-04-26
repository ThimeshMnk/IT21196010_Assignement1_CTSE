import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Grid, Card, CardContent, CardMedia,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import axios from 'axios';

const Reservations = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState('');

  // Load user ID from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      setUserId(user._id);
    }
  }, []);

  // Fetch available rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('https://hotel-backend-124923079078.asia-south1.run.app/api/rooms');
        const availableRooms = res.data.filter(room => room.available === true || room.available === 'true');
        setRooms(availableRooms);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      }
    };

    fetchRooms();
  }, []);

  const handleOpen = (room) => {
    setSelectedRoom(room);
    setCheckIn('');
    setCheckOut('');
    setMessage('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoom(null);
    setMessage('');
  };

  const handleReserve = async () => {
    if (!checkIn || !checkOut) {
      setMessage("Please select check-in and check-out dates.");
      return;
    }

    console.log("Sending reservation:", {
      userId,
      roomId: selectedRoom?._id,
      checkIn,
      checkOut
    });

    try {
      await axios.post('https://hotel-backend-124923079078.asia-south1.run.app/api/reservations', {
        userId,
        roomId: selectedRoom._id,
        checkIn,
        checkOut
      });
      setMessage("Reservation successful!");
    } catch (err) {
      console.error("Reservation error:", err.response?.data || err.message);
      setMessage("Failed to reserve. Try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Book a Room</Typography>

      <Grid container spacing={3}>
        {rooms.length > 0 ? rooms.map((room) => (
          <Grid item xs={12} md={4} key={room._id}>
            <Card>
              {room.image && (
                <CardMedia
                  component="img"
                  height="160"
                  image={`https://hotel-backend-124923079078.asia-south1.run.app/${room.image}`}
                  alt={room.roomType}
                />
              )}
              <CardContent>
                <Typography variant="h6">{room.roomType}</Typography>
                <Typography variant="body2">Price: ${room.price}</Typography>
                <Typography variant="body2">Features: {room.features.join(', ')}</Typography>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => handleOpen(room)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )) : (
          <Typography variant="body1" sx={{ mt: 2 }}>No available rooms right now.</Typography>
        )}
      </Grid>

      {/* Reservation Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Book Room: {selectedRoom?.roomType}</DialogTitle>
        <DialogContent>
          <TextField
            label="Check-in Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <TextField
            label="Check-out Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
          {message && (
            <Typography
              variant="body2"
              color={message.includes('success') ? 'success.main' : 'error.main'}
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReserve} variant="contained">Reserve</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Reservations;
