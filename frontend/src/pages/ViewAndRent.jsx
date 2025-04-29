// src/pages/ViewAndRent.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  CardMedia,
  Box,
  TextField,
  Button
} from '@mui/material';

const ViewAndRent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [dates, setDates] = useState({ startDate: '', endDate: '' });

  useEffect(() => {
    axios.get(`https://car-rental-backend-991854476845.asia-south1.run.app/api/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setDates(d => ({ ...d, [name]: value }));
  };

  const handleRent = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'https://car-rental-backend-991854476845.asia-south1.run.app/api/rentals',
        { carId: id, ...dates },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Car rented successfully');
      navigate('/my-rentals');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Rental failed');
    }
  };

  if (!car) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {car.carName}
        </Typography>
        {car.imageUrl && (
          <CardMedia
            component="img"
            height="200"
            image={car.imageUrl}
            alt={car.carName}
          />
        )}
        <Typography sx={{ mt: 2 }}>
          {car.brand} — {car.model} ({car.year})
        </Typography>
        <Typography>Rent per day: LKR {car.rentPerDay}</Typography>

        <Box
          component="form"
          onSubmit={handleRent}
          sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dates.startDate}
            onChange={handleChange}
            required
          />
          <TextField
            name="endDate"
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dates.endDate}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            disabled={car.status !== 'Available'}
          >
            {car.status === 'Available' ? 'Rent Car' : 'Unavailable'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewAndRent;
