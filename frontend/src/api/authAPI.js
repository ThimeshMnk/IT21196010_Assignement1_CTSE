import axios from 'axios';

const BASE_URL = 'https://hotel-backend-124923079078.asia-south1.run.app/api/auth'; // Change this for production

// Register new user
export const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/register`, userData);
};

// Login existing user
export const loginUser = async (credentials) => {
  return await axios.post(`${BASE_URL}/login`, credentials);
};
