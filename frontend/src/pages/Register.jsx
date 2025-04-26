import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/authAPI';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Paper,
} from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
    mobile: '', nic: '', userType: 'staff',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registration successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(to right, #e0f7fa, #e0f2f1)',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>

            <TextField
              fullWidth
              name="name"
              label="Full Name"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              name="mobile"
              label="Mobile Number"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              name="nic"
              label="NIC"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              required
            />

            <TextField
              select
              fullWidth
              name="userType"
              label="User Type"
              variant="outlined"
              margin="normal"
              value={formData.userType}
              onChange={handleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="staff">Staff</MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.2 }}
            >
              Register
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account? <Link to="/">Login here</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
