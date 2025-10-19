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
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      await axios.post(`${API_URL}/api/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.msg || 'Registration failed. Please try again.'
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
            <PersonAddOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar
                src={preview}
                sx={{ width: 80, height: 80, border: '2px solid #ddd' }}
              />
            </Box>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{
                mb: 2,
                py: 1.2,
                borderRadius: '50px',
                backgroundColor: '#424242',
                '&:hover': { backgroundColor: '#616161' },
              }}
            >
              Upload Profile Picture
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*"
              />
            </Button>

            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  <Link
                    to="/login"
                    style={{ color: '#6a1b9a', textDecoration: 'none' }}
                  >
                    {'Already have an account? Sign In'}
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

export default Signup;
