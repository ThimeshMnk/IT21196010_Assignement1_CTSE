import React, { useEffect, useState } from 'react';
import SideNav from '../components/SideNav';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [carCount, setCarCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [rentalCount, setRentalCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const token = localStorage.getItem('token');
      try {
        // Users
        const usersRes = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserCount(usersRes.data.length);

        // Cars
        const carsRes = await axios.get('http://localhost:5000/api/cars');
        setCarCount(carsRes.data.length);

        // Rentals
        const rentalsRes = await axios.get('http://localhost:5000/api/rentals', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRentalCount(rentalsRes.data.length);

      } catch (err) {
        console.error('Failed to fetch counts:', err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundImage: `url(https://images.unsplash.com/photo-1511391935150-3653e35b6488?auto=format&fit=crop&w=1950&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        {/* Semi-opaque overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            backgroundColor: 'rgba(255,255,255,0.85)',
            zIndex: 0
          }}
        />

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1, px: 4, py: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: '#1E293B', textAlign: 'center' }}
          >
            Car Rental Admin Dashboard
          </Typography>

          {/* Summary Cards */}
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: '#1E293B', color: 'white', textAlign: 'center' }}>
                <Typography variant="h6">Total Cars</Typography>
                <Typography variant="h4">{carCount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: '#1E293B', color: 'white', textAlign: 'center' }}>
                <Typography variant="h6">Active Rentals</Typography>
                <Typography variant="h4">{rentalCount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: '#1E293B', color: 'white', textAlign: 'center' }}>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">{userCount}</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Recent Rentals (static placeholder) */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1E293B' }}>
              Recent Rentals
            </Typography>
            <Paper elevation={2} sx={{ p: 2 }}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Toyota Corolla - Jane Smith"
                    secondary="Rent Start: May 1 | Return: May 5"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Honda Civic - John Doe"
                    secondary="Rent Start: April 28 | Return: May 2"
                  />
                </ListItem>
              </List>
            </Paper>
          </Box>

          {/* Quick Actions */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#1E293B' }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'inline-flex', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                href="/manage-cars"
                sx={{ bgcolor: '#334155', '&:hover': { bgcolor: '#475569' } }}
              >
                Manage Cars
              </Button>
              <Button
                variant="contained"
                href="/manage-users"
                sx={{ bgcolor: '#334155', '&:hover': { bgcolor: '#475569' } }}
              >
                Manage Users
              </Button>
              <Button
                variant="contained"
                href="/manage-rentals"
                sx={{ bgcolor: '#334155', '&:hover': { bgcolor: '#475569' } }}
              >
                View Rentals
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
