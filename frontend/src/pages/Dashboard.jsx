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
  const [roomCount, setRoomCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const token = localStorage.getItem('token');
      try {
        const usersRes = await axios.get('https://hotel-backend-124923079078.asia-south1.run.app/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserCount(usersRes.data.length);

        const roomsRes = await axios.get('https://hotel-backend-124923079078.asia-south1.run.app/api/rooms');
        setRoomCount(roomsRes.data.length);
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 0
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, px: 3, py: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#1E293B', textAlign: 'center' }}>
            Welcome to Hotel Admin Dashboard
          </Typography>

          {/* Summary Cards */}
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 3, backgroundColor: '#1E293B', color: 'white', textAlign: 'center' }}>
                <Typography variant="h6">Total Rooms</Typography>
                <Typography variant="h4">{roomCount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 3, backgroundColor: '#1E293B', color: 'white', textAlign: 'center' }}>
                <Typography variant="h6">Active Reservations</Typography>
                <Typography variant="h4">12</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 3, backgroundColor: '#1E293B', color: 'white', textAlign: 'center' }}>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">{userCount}</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Latest Reservations (static for now) */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1E293B' }}>
              Recent Reservations
            </Typography>
            <Paper elevation={2} sx={{ backgroundColor: 'white' }}>
              <List>
                <ListItem>
                  <ListItemText primary="Deluxe Room - Binuri Gunawardena" secondary="Check-in: April 20 | Check-out: April 22" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Single Room - John Doe" secondary="Check-in: April 21 | Check-out: April 24" />
                </ListItem>
              </List>
            </Paper>
          </Box>

          {/* Quick Actions */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#1E293B' }}>Quick Actions</Typography>
            <Box sx={{ display: 'inline-flex', gap: 2, mt: 2 }}>
              <Button variant="contained" href="/inventory" sx={{ backgroundColor: '#334155', '&:hover': { backgroundColor: '#475569' } }}>
                Manage Rooms
              </Button>
              <Button variant="contained" href="/users" sx={{ backgroundColor: '#334155', '&:hover': { backgroundColor: '#475569' } }}>
                Manage Users
              </Button>
              <Button variant="contained" href="/reserved-rooms" sx={{ backgroundColor: '#334155', '&:hover': { backgroundColor: '#475569' } }}>
                View Reservations
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;