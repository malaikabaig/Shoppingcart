import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

export default function CheckoutPage({ cart }) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          height: '100vh', // Full viewport height
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 600, // Max width of the inner box
            border: '1px solid #ddd',
            borderRadius: 4,
            padding: 4,
            backgroundColor: 'white',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
          }}
        >
          <Typography variant="h4" gutterBottom>
            Checkout
          </Typography>

          <Divider sx={{ marginBottom: 2 }} />

          {/* Display cart items or summary here */}
          {cart.length > 0 ? (
            cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  marginBottom: 2,
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">{item.title}</Typography>
                <Typography>Price: ${item.price}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="h6" color="textSecondary">
              Nothing to checkout
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
