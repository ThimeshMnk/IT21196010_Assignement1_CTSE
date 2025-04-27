import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authAPI";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import sideImage from "../assets/bg3.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const {token,userType,user} = await loginUser({email,password})
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('user', JSON.stringify(user));
      
      if(userType==='admin'||userType==='manager') navigate('/dashboard');
      else navigate('/car-list');
    } catch(err){
      alert(err.response?.data?.message||err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${sideImage})`,
        backgroundSize: 'cover',
        objectFit: 'cover',
        backgroundPosition: 'right',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.2 }}
            >
              Login
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Don't have an account? <Link to="/register">Register here</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
