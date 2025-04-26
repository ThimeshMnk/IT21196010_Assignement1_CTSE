// import React from 'react';
// import SideNav from '../components/SideNav';
// import { Box, Typography } from '@mui/material';

// const RoomInventory = () => (
//   <Box sx={{ display: 'flex' }}>
//     <SideNav />
//     <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
//       <Typography variant="h4">Room Inventory</Typography>
//       <Typography variant="body1" sx={{ mt: 2 }}>
//         Content for room inventory goes here.
//       </Typography>
//     </Box>
//   </Box>
// );

// export default RoomInventory;
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box,Button, Grid, Card, CardContent, CardMedia,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, FormControlLabel
} from '@mui/material';
import axios from 'axios';

const RoomInventory = () => {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [roomData, setRoomData] = useState({
    roomType: '', price: '', features: '', available: true
  });
  const [image, setImage] = useState(null);

  const fetchRooms = async () => {
    try {
      const res = await axios.get('https://hotel-backend-124923079078.asia-south1.run.app/api/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setRoomData({ roomType: '', price: '', features: '', available: true });
    setImage(null);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setEditingRoomId(null);
  };

  const handleChange = (e) => {
    setRoomData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToggle = () => {
    setRoomData(prev => ({ ...prev, available: !prev.available }));
  };

  const handleEdit = (room) => {
    setEditMode(true);
    setEditingRoomId(room._id);
    setRoomData({
      roomType: room.roomType,
      price: room.price,
      features: room.features.join(', '),
      available: room.available
    });
    setImage(null);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://hotel-backend-124923079078.asia-south1.run.app/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRooms();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete room');
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (editMode) {
        await axios.put(`https://hotel-backend-124923079078.asia-south1.run.app/api/rooms/${editingRoomId}`, roomData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        const formData = new FormData();
        formData.append('roomType', roomData.roomType);
        formData.append('price', roomData.price);
        formData.append('features', roomData.features);
        formData.append('available', roomData.available);
        if (image) formData.append('image', image);

        await axios.post('https://hotel-backend-124923079078.asia-south1.run.app/api/rooms', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }

      handleClose();
      fetchRooms();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Room Inventory</Typography>

      <Button variant="contained" onClick={handleOpen} sx={{ mb: 3 }}>
        + Add Room
      </Button>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} md={6} lg={4} key={room._id}>
          <Card sx={{ minHeight: 320 }}>
            {room.image && (
              <CardMedia
                component="img"
                height="200"
                image={`https://hotel-backend-124923079078.asia-south1.run.app/${room.image}`}
                alt={room.roomType}
              />
            )}
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>{room.roomType}</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>Price: ${room.price}</Typography>
              <Typography variant="body1">Features: {room.features.join(', ')}</Typography>
              <Typography variant="body1">Available: {room.available ? 'Yes' : 'No'}</Typography>
        
              <Box sx={{ mt: 2 }}>
                <Button size="small" variant="outlined" color="primary" onClick={() => handleEdit(room)} sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(room._id)}>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        ))}
      </Grid>

      {/* Add/Edit Room Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Room' : 'Add New Room'}</DialogTitle>
        <DialogContent>
          <TextField
            name="roomType"
            label="Room Type"
            fullWidth
            margin="normal"
            value={roomData.roomType}
            onChange={handleChange}
            required
          />
          <TextField
            name="price"
            label="Price per Night"
            type="number"
            fullWidth
            margin="normal"
            value={roomData.price}
            onChange={handleChange}
            required
          />
          <TextField
            name="features"
            label="Features (comma-separated)"
            fullWidth
            margin="normal"
            value={roomData.features}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Switch checked={roomData.available} onChange={handleToggle} />}
            label="Available"
            sx={{ mt: 2 }}
          />
          {!editMode && (
            <Button
              variant="outlined"
              component="label"
              sx={{ mt: 2 }}
            >
              Upload Image
              <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
            </Button>
          )}
          {image && <Typography variant="body2" sx={{ mt: 1 }}>{image.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{editMode ? 'Update' : 'Add Room'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoomInventory;
