import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Button, Box
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://car-rental-backend-991854476845.asia-south1.run.app/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditOpen = (user) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setSelectedUser(null);
    setEditOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://car-rental-backend-991854476845.asia-south1.run.app/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://car-rental-backend-991854476845.asia-south1.run.app/api/users/${selectedUser._id}`,
        selectedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleEditClose();
      fetchUsers();
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1E293B' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Mobile</TableCell>
              <TableCell sx={{ color: 'white' }}>Address</TableCell>
              <TableCell sx={{ color: 'white' }}>License #</TableCell>
              <TableCell sx={{ color: 'white' }}>User Type</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.driverLicenseNumber}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1.5,
                      py: 0.5,
                      backgroundColor:
                        user.userType === 'admin'
                          ? '#2563EB'
                          : '#EAB308',
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {user.userType}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditOpen(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(user._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={selectedUser?.name || ''}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            value={selectedUser?.email || ''}
            onChange={handleChange}
          />
          <TextField
            name="mobile"
            label="Mobile"
            fullWidth
            margin="normal"
            value={selectedUser?.mobile || ''}
            onChange={handleChange}
          />
          <TextField
            name="address"
            label="Address"
            fullWidth
            margin="normal"
            value={selectedUser?.address || ''}
            onChange={handleChange}
          />
          <TextField
            name="driverLicenseNumber"
            label="Driver License #"
            fullWidth
            margin="normal"
            value={selectedUser?.driverLicenseNumber || ''}
            onChange={handleChange}
          />
          <TextField
            name="userType"
            label="User Type"
            fullWidth
            margin="normal"
            value={selectedUser?.userType || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;
