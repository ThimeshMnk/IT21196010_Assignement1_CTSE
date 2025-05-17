// src/pages/CarManagement.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, MenuItem
} from '@mui/material';

import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const statusOptions = ['Available', 'Rented'];

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const userType = localStorage.getItem('userType')?.toLowerCase();

  const [formCar, setFormCar] = useState({
    carName: '',
    brand: '',
    model: '',
    year: '',
    plateNumber: '',
    rentPerDay: '',
    status: 'Available',
    imageUrl: '',
  });

  const fetchCars = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://car-rental-backend-991854476845.asia-south1.run.app/api/cars', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(res.data);
    } catch (err) {
      console.error('Failed to fetch cars:', err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // --- Handlers for Add ---
  const handleAddOpen = () => {
    setFormCar({
      carName: '',
      brand: '',
      model: '',
      year: '',
      plateNumber: '',
      rentPerDay: '',
      status: 'Available',
      imageUrl: '',
    });
    setAddOpen(true);
  };
  const handleAddClose = () => setAddOpen(false);
  const handleAddChange = e => {
    const { name, value } = e.target;
    setFormCar(f => ({ ...f, [name]: value }));
  };
  const handleAddSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://car-rental-backend-991854476845.asia-south1.run.app/api/cars',
        formCar,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleAddClose();
      fetchCars();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add car');
    }
  };

  // --- Handlers for Edit ---
  const handleEditOpen = car => {
    setSelectedCar(car);
    setFormCar({ ...car });
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setSelectedCar(null);
    setEditOpen(false);
  };
  const handleEditChange = e => {
    const { name, value } = e.target;
    setFormCar(f => ({ ...f, [name]: value }));
  };
  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://car-rental-backend-991854476845.asia-south1.run.app/api/cars/${selectedCar._id}`,
        formCar,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleEditClose();
      fetchCars();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update car');
    }
  };

  // --- Handler for Delete ---
  const handleDelete = async id => {
    if (!window.confirm('Delete this car?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://car-rental-backend-991854476845.asia-south1.run.app/api/cars/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCars();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Car Management</Typography>
        <Button variant="contained" onClick={handleAddOpen}>
          + Add Car
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1E293B' }}>
            <TableRow>
              {[
                'Name','Brand','Model','Year',
                'Plate #','Rent/Day','Status','Image URL','Actions'
              ].map(header => (
                <TableCell key={header} sx={{ color: 'white' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map(car => (
              <TableRow key={car._id} hover>
                <TableCell>{car.carName}</TableCell>
                <TableCell>{car.brand}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.plateNumber}</TableCell>
                <TableCell>{car.rentPerDay}</TableCell>
                <TableCell>{car.status}</TableCell>
                <TableCell>
                  <a href={car.imageUrl} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditOpen(car)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(car._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ——— Add Car Dialog ——— */}
      <Dialog open={addOpen} onClose={handleAddClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Car</DialogTitle>
        <DialogContent>
          {[
            { name:'carName', label:'Car Name', type:'text' },
            { name:'brand',   label:'Brand',    type:'text' },
            { name:'model',   label:'Model',    type:'text' },
            { name:'year',    label:'Year',     type:'number' },
            { name:'plateNumber', label:'Plate Number', type:'text' },
            { name:'rentPerDay',  label:'Rent per Day', type:'number' },
            { name:'imageUrl',    label:'Image URL',    type:'text' },
          ].map(f => (
            <TextField
              key={f.name}
              name={f.name}
              label={f.label}
              type={f.type}
              fullWidth
              margin="normal"
              value={formCar[f.name]}
              onChange={handleAddChange}
              required
            />
          ))}

          <TextField
            select
            name="status"
            label="Status"
            fullWidth
            margin="normal"
            value={formCar.status}
            onChange={handleAddChange}
          >
            {statusOptions.map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAddSubmit} variant="contained">Add Car</Button>
        </DialogActions>
      </Dialog>

      {/* ——— Edit Car Dialog ——— */}
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          {[
            { name:'carName', label:'Car Name', type:'text' },
            { name:'brand',   label:'Brand',    type:'text' },
            { name:'model',   label:'Model',    type:'text' },
            { name:'year',    label:'Year',     type:'number' },
            { name:'plateNumber', label:'Plate Number', type:'text' },
            { name:'rentPerDay',  label:'Rent per Day', type:'number' },
            { name:'imageUrl',    label:'Image URL',    type:'text' },
          ].map(f => (
            <TextField
              key={f.name}
              name={f.name}
              label={f.label}
              type={f.type}
              fullWidth
              margin="normal"
              value={formCar[f.name]}
              onChange={handleEditChange}
            />
          ))}

          <TextField
            select
            name="status"
            label="Status"
            fullWidth
            margin="normal"
            value={formCar.status}
            onChange={handleEditChange}
          >
            {statusOptions.map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CarManagement;
