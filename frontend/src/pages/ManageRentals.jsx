import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Box
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ManageRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);

  // Fetch all rentals
  const fetchRentals = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://car-rental-backend-991854476845.asia-south1.run.app/api/rentals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRentals(res.data);
    } catch (err) {
      console.error('Failed to fetch rentals:', err);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  // Open edit dialog
  const handleEditOpen = (rental) => {
    setSelectedRental({
      ...rental,
      startDate: rental.startDate.slice(0, 10),
      endDate:   rental.endDate.slice(0, 10)
    });
    setEditOpen(true);
  };

  // Close edit dialog
  const handleEditClose = () => {
    setSelectedRental(null);
    setEditOpen(false);
  };

  // Delete rental
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this rental?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://car-rental-backend-991854476845.asia-south1.run.app/api/rentals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRentals();
      alert('Rental deleted');
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedRental(prev => ({ ...prev, [name]: value }));
  };

  // Submit update
  const handleEditSubmit = async () => {
    if (!selectedRental) return;
    try {
      const token = localStorage.getItem('token');
      const { _id, status, startDate, endDate } = selectedRental;

      // Send JSON payload with content-type header
      const res = await axios.put(
        `https://car-rental-backend-991854476845.asia-south1.run.app/api/rentals/${_id}`,
        { status, startDate, endDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update local state
      setRentals(rentals.map(r => r._id === _id ? res.data : r));
      handleEditClose();
      alert('Rental updated');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Rentals
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1E293B' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Car</TableCell>
              <TableCell sx={{ color: 'white' }}>User</TableCell>
              <TableCell sx={{ color: 'white' }}>From</TableCell>
              <TableCell sx={{ color: 'white' }}>To</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Total Cost</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentals.map(r => (
              <TableRow key={r._id} hover>
                <TableCell>{r.car.carName} ({r.car.plateNumber})</TableCell>
                <TableCell>{r.user.name}</TableCell>
                <TableCell>{new Date(r.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(r.endDate).toLocaleDateString()}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell>LKR {r.totalCost}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditOpen(r)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(r._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Rental Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Rental</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
            <TextField
              label="Start Date"
              type="date"
              name="startDate"
              value={selectedRental?.startDate || ''}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              name="endDate"
              value={selectedRental?.endDate || ''}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <Select
              name="status"
              value={selectedRental?.status || ''}
              onChange={handleChange}
              fullWidth
            >
              {['Active','Completed','Cancelled'].map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageRentals;
