import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/authAPI';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from '@mui/material';

// 1️⃣ Import your image
import sideImage from '../assets/bg.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    driverLicenseNumber: '',
    userType: 'customer',
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      {/* Left column: the form */}
      <Box
        sx={{
          flex: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 1,
          background: 'linear-gradient(135deg, #6F7E91 0%, #3E4A59 100%)'        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            maxWidth: 500,
            p: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Create Your Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth name="name" label="Full Name"
              variant="outlined" margin="normal"
              onChange={handleChange} required
              size='small'
            />
            <TextField
              fullWidth name="email" label="Email"
              type="email" variant="outlined" margin="normal"
              onChange={handleChange} required
                size='small'
            />
            <TextField
              fullWidth name="password" label="Password"
              type="password" variant="outlined" margin="normal"
              onChange={handleChange} required
                size='small'
            />
            <TextField
              fullWidth name="mobile" label="Mobile Number"
              variant="outlined" margin="normal"
              onChange={handleChange} required
                size='small'
            />
            <TextField
              fullWidth name="address" label="Address"
              variant="outlined" margin="normal"
              onChange={handleChange}
                size='small'
            />
            <TextField
              fullWidth name="driverLicenseNumber"
              label="Driver License Number"
              variant="outlined" margin="normal"
              onChange={handleChange} required
                size='small'
            />
            <TextField
              select fullWidth name="userType" label="User Type"
              variant="outlined" margin="normal"
              value={formData.userType} onChange={handleChange}
                size='small'
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
            <Button
              type="submit" variant="contained" color="primary"
              fullWidth sx={{ mt: 3, py: 1.5 }}
                size='small'
            >
              Register
            </Button>
            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account? <Link to="/">Login here</Link>
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Right column: the background image */}
      <Box
        sx={{
          flex: 2,
          backgroundImage: `url(${sideImage})`,
          backgroundSize: 'cover',
          objectFit: 'cover',
          backgroundPosition: 'right',
        }}
      />
    </Box>
  );
};

export default Register;
