import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUserData, setCart }) => {
  // setCart ko yahan receive karein
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Step 1: User ko login karein
      const loginRes = await axios.post(
        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        }
      );

      // Step 2: User data aur token ko state aur localStorage mein save karein
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);

      // Step 3: Naya Code - Usi token se user ka cart fetch karein
      const cartRes = await axios.get('http://localhost:5000/api/cart/', {
        headers: { 'x-auth-token': loginRes.data.token },
      });
      setCart(cartRes.data.items || []); // Cart state ko update karein

      // Step 4: Home page par navigate karein
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography variant="body2">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
