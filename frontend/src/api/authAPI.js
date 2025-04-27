import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth';

export const registerUser = (userData) =>
  axios.post(`${BASE_URL}/register`, userData);

export const loginUser = async (credentials) => {
  // ① POST to the /login endpoint
  const { data } = await axios.post(`${BASE_URL}/login`, credentials);
  // ② response.data ===== { token, userType, user }
  return data;
};
