import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, CardMedia,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import axios from 'axios';

const ReservedRooms = () => {
  const [reservations, setReservations] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const fetchReservations = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) return;

      const res = await axios.get(`https://hotel-backend-124923079078.asia-south1.run.app/api/reservations/user/${user._id}`);
      setReservations(res.data);
    } catch (err) {
      console.error('Error fetching reservations:', err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
    try {
      await axios.delete(`https://hotel-backend-124923079078.asia-south1.run.app/api/reservations/${id}`);
      fetchReservations();
    } catch (err) {
      alert('Failed to cancel reservation');
    }
  };

  const openEditDialog = (res) => {
    setEditingReservation(res);
    setCheckIn(res.checkIn.split('T')[0]);
    setCheckOut(res.checkOut.split('T')[0]);
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://hotel-backend-124923079078.asia-south1.run.app/api/reservations/${editingReservation._id}`, {
        checkIn,
        checkOut
      });
      setEditOpen(false);
      fetchReservations();
    } catch (err) {
      alert('Failed to update reservation');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Reserved Rooms</Typography>

      <Grid container spacing={3}>
        {reservations.length > 0 ? reservations.map((res) => (
          <Grid item xs={12} md={4} key={res._id}>
            <Card>
              {res.roomId?.image && (
                <CardMedia
                  component="img"
                  height="160"
                  image={`https://hotel-backend-124923079078.asia-south1.run.app/${res.roomId.image}`}
                  alt={res.roomId.roomType}
                />
              )}
              <CardContent>
                <Typography variant="h6">{res.roomId?.roomType}</Typography>
                <Typography variant="body2">Price: ${res.roomId?.price}</Typography>
                <Typography variant="body2">Features: {res.roomId?.features?.join(', ')}</Typography>
                <Typography variant="body2">Check-in: {new Date(res.checkIn).toLocaleDateString()}</Typography>
                <Typography variant="body2">Check-out: {new Date(res.checkOut).toLocaleDateString()}</Typography>

                <Button variant="outlined" color="error" sx={{ mt: 2, mr: 1 }} onClick={() => handleCancel(res._id)}>
                  Cancel
                </Button>
                <Button variant="outlined" onClick={() => openEditDialog(res)} sx={{ mt: 2 }}>
                  Edit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )) : (
          <Typography variant="body1" sx={{ mt: 2 }}>You have no reservations yet.</Typography>
        )}
      </Grid>

      {/* Edit Modal */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Reservation Dates</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReservedRooms;
