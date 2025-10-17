import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '80vh', // Taake content page ke center mein dikhe
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Shop
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Discover the latest trends in fashion. Quality and style delivered to
          your doorstep.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/shop"
          size="large"
          sx={{ marginTop: '20px' }}
        >
          Start Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
