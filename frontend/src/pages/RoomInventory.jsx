import React, { useEffect, useState } from 'react';
import { Link,useLocation  } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button
} from '@mui/material';
import axios from 'axios';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const location = useLocation();
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
     }, [location]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Cars
      </Typography>

      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {car.imageUrl && (
                <CardMedia
                  component="img"
                  height="180"
                  image={car.imageUrl}
                  alt={car.carName}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {car.carName}
                </Typography>
                <Typography variant="body2">
                  {car.brand} — {car.model} ({car.year})
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Rent / day: LKR {car.rentPerDay}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={car.status}
                    color={car.status === 'Available' ? 'success' : 'default'}
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
