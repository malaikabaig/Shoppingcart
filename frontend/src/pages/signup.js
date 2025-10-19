import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Avatar,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null); // File ke liye state
  const [preview, setPreview] = useState(''); // Image preview ke liye
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); // File ka preview URL banayein
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // FormData object banayein
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      // Axios request ko FormData ke saath bhejein
      await axios.post(`${API_URL}/api/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/login'); // Login page par redirect karein
    } catch (err) {
      setError(
        err.response?.data?.msg || 'Registration failed. Please try again.'
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {/* Avatar Preview */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar src={preview} sx={{ width: 80, height: 80 }} />
          </Box>

          {/* File Input Button */}
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
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
            Sign Up
          </Button>
          <Typography variant="body2">
            Already have an account? <Link to="/login">Sign In</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
