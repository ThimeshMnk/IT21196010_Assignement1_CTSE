const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./dbConfig/db');

const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rentals', rentalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
