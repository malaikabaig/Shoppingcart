// src/pages/NotFound.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f3e5f5"
    >
      <Box
        textAlign="center"
        bgcolor="lavender"
        borderRadius={2}
        padding={4}
        boxShadow={3}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1">
          The page you are looking for does not exist.
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
