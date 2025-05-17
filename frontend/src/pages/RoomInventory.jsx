import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  useTheme
} from '@mui/material';
import axios from 'axios';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const loc = useLocation();
  const theme = useTheme();
  const statusOptions = ['Available', 'Rented'];
  const [open, setOpen] = useState(false);
  const [newCar, setNewCar] = useState({
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
      const res = await axios.get('https://car-rental-backend-991854476845.asia-south1.run.app/api/cars');
      setCars(res.data);
    } catch (err) {
      console.error('Failed to fetch cars:', err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [loc]);

  const handleOpen = () => {
    setNewCar({
      carName: '',
      brand: '',
      model: '',
      year: '',
      plateNumber: '',
      rentPerDay: '',
      status: 'Available',
      imageUrl: '',
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/cars',
        newCar,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleClose();
      fetchCars();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add car');
    }
  };
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{color : "white"}}>
        Available Cars
      </Typography>

      <Grid container spacing={4} justifyContent="flex-start">
        {cars.map((car) => (
          <Grid item key={car._id}>
            <Card
              sx={{
                width: 300,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: theme.shadows[3],
                borderRadius: 2,
                '&:hover': {
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              {car.imageUrl && (
                <CardMedia
                  component="img"
                  height="180"
                  image={car.imageUrl}
                  alt={car.carName}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h6" gutterBottom noWrap>
                  {car.carName}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {car.brand} — {car.model} ({car.year})
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 500 }}>
                  Rent / day: LKR {car.rentPerDay}
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Chip
                    label={car.status}
                    sx={{
                      backgroundColor:
                        car.status === 'Available'
                          ? theme.palette.success.main
                          : theme.palette.grey[500],
                      color: '#fff',
                      fontWeight: 600,
                    }}
                    size="small"
                  />
                  <Button
                    component={Link}
                    to={`/view-and-rent/${car._id}`}
                    variant="outlined"
                    size="small"
                    disabled={car.status !== 'Available'}
                    sx={{ ml: 'auto' }}
                  >
                    {car.status === 'Available' ? 'View & Rent' : 'Unavailable'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CarsList;
