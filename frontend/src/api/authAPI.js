import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth'; // Change this for production

// Register new user
export const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/register`, userData);
};

// Login existing user
export const loginUser = async (credentials) => {
  const { data } = await axios.post('http://localhost:5000/api/auth/login', credentials);
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  localStorage.setItem('userType', data.userType);
  return data;
};