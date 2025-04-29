// Backend/scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');

// Your Mongoose models (adjust paths if needed)
const User   = require('../models/User');
const Car    = require('../models/Car');
const Rental = require('../models/Rental');

async function seed() {
  try {
    // 1) Connect
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔗 Connected to MongoDB');

    // 2) Clear existing data
    await User.deleteMany();
    await Car.deleteMany();
    await Rental.deleteMany();
    console.log('🗑️  Cleared collections');

    // 3) Seed users
    const users = await User.create([
      {
        name: 'Alice Customer',
        email: 'alice@example.com',
        password: 'password123',
        mobile: '555-0101',
        driverLicenseNumber: 'DL123456',
        userType: 'customer',
      },
      {
        name: 'Bob Admin',
        email: 'bob@example.com',
        password: 'password123',
        mobile: '555-0202',
        driverLicenseNumber: 'DL654321',
        userType: 'admin',
      },
    ]);

    // 4) Seed cars (with plateNumber & imageUrl)
    const cars = await Car.create([
      {
        carName:    'Toyota Corolla',
        brand:      'Toyota',
        model:      'Corolla',
        year:       2020,
        rentPerDay: 40,
        status:     'Available',
        plateNumber:'ABC-1234',
        imageUrl:   'https://t4.ftcdn.net/jpg/03/09/59/07/240_F_309590738_R34phqyyTlQtjZjfsI2mcgS3LNfleocw.jpg',
      },
      {
        carName:    'Honda Civic',
        brand:      'Honda',
        model:      'Civic',
        year:       2019,
        rentPerDay: 35,
        status:     'Available',
        plateNumber:'XYZ-5678',
        imageUrl:   'https://as2.ftcdn.net/v2/jpg/04/45/55/89/1000_F_445558907_Grlx5y55xjg0CbIyH3fuDM9Lnhg74kML.jpg',
      },
      {
        carName:    'Mercedes C200',
        brand:      'Mercedes',
        model:      'C200',
        year:       2021,
        rentPerDay: 80,
        status:     'Available',
        plateNumber:'MRC-2021',
        imageUrl:   'https://t4.ftcdn.net/jpg/04/13/88/35/240_F_413883575_YQyVepqEQDQ2EdhGcEeSZrTilKPt9enY.jpg',
      },
      {
        carName:    'Ford Focus',
        brand:      'Ford',
        model:      'Focus',
        year:       2018,
        rentPerDay: 30,
        status:     'Available',
        plateNumber:'FRD-2018',
        imageUrl:   'https://t4.ftcdn.net/jpg/11/38/86/35/240_F_1138863589_ybkWyaSizZHBBBPEYmJ69XmKnYqo21Uz.jpg',
      },
      {
        carName:    'BMW 3 Series',
        brand:      'BMW',
        model:      '320i',
        year:       2022,
        rentPerDay: 75,
        status:     'Available',
        plateNumber:'BMW-320I',
        imageUrl:   'https://t3.ftcdn.net/jpg/03/04/81/74/240_F_304817495_eevukUnrDqyU9PFfrO7gkpaMc6y8eth9.jpg',
      },
      {
        carName:    'Hyundai Elantra',
        brand:      'Hyundai',
        model:      'Elantra',
        year:       2020,
        rentPerDay: 38,
        status:     'Available',
        plateNumber:'HYU-2020',
        imageUrl:   'https://t3.ftcdn.net/jpg/05/91/24/56/240_F_591245698_V8zpRZAc4B0X7iNlR04W3sVqUA2OZe9r.jpg',
      },
      {
        carName:    'Audi A4',
        brand:      'Audi',
        model:      'A4',
        year:       2021,
        rentPerDay: 85,
        status:     'Available',
        plateNumber:'AUD-A4',
        imageUrl:   'https://t3.ftcdn.net/jpg/03/63/44/86/240_F_363448614_dW0J1zVMfdg4rg93oD3M0qyVo44SYR01.jpg',
      },
    ]);
    

    console.log(`✅ Seeded ${users.length} users and ${cars.length} cars.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
