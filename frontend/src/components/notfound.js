// src/pages/NotFound.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // Full viewport height
      bgcolor="#f3e5f5" // Light lavender background
    >
      <Box
        textAlign="center"
        bgcolor="lavender" // Lavender background for the title box
        borderRadius={2} // Rounded corners
        padding={4} // Spacing inside the box
        boxShadow={3} // Shadow for a lifted effect
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
