import axios from 'axios';

const BASE_URL = 'https://car-rental-backend-991854476845.asia-south1.run.app/api/auth'; 

// Register new user
export const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/register`, userData);
};

// Login existing user
export const loginUser = async (credentials) => {
  return await axios.post(`${BASE_URL}/login`, credentials);
  
};
