import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Avatar,
  Grid,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

const Login = ({ setUserData, setCart }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const loginRes = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);

      const cartRes = await axios.get(`${API_URL}/api/cart/`, {
        headers: { 'x-auth-token': loginRes.data.token },
      });
      setCart(cartRes.data.items || []);

      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        p: { xs: 2, sm: 4 },
        background: 'linear-gradient(45deg, #f3e5f5 30%, #e1bee7 90%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#212121' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
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
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: '50px',
                backgroundColor: '#212121',
                '&:hover': { backgroundColor: '#424242' },
              }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  <Link
                    to="/signup"
                    style={{ color: '#6a1b9a', textDecoration: 'none' }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
