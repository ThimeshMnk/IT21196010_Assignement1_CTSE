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
  Paper
} from '@mui/material';

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/rentals/my', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setRentals(res.data))
      .catch(err => console.error('Failed to load rentals:', err));
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Rentals
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1E293B' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Car</TableCell>
              <TableCell sx={{ color: 'white' }}>From</TableCell>
              <TableCell sx={{ color: 'white' }}>To</TableCell>
              <TableCell sx={{ color: 'white' }}>Daily Rate</TableCell>
              <TableCell sx={{ color: 'white' }}>Total Cost</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentals.map(r => (
              <TableRow key={r._id} hover>
                <TableCell>
                  {r.car.carName} ({r.car.plateNumber})
                </TableCell>
                <TableCell>
                  {new Date(r.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(r.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>LKR {r.car.rentPerDay}</TableCell>
                <TableCell>LKR {r.totalCost}</TableCell>
                <TableCell>{r.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyRentals;
