import React from 'react';
import { Box, Typography, Divider, Button, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { productImages } from '../images/images'; // Images import karein

export default function CheckoutPage({ cart }) {
  // Calculate Subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 0 ? 5.0 : 0; // Agar cart mein kuch hai to $5 shipping
  const total = subtotal + shipping;

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // Navbar ki height minus karke full height
        p: { xs: 2, sm: 4 },
        // Homepage ke hero section se inspired gradient background
        background: 'linear-gradient(45deg, #f3e5f5 30%, #e1bee7 90%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 700,
          borderRadius: '12px',
          p: { xs: 2, sm: 4 },
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Thora sa transparent white
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          Checkout Summary
        </Typography>

        <Divider sx={{ my: 2 }} />

        {cart.length > 0 ? (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Summary
            </Typography>
            {cart.map((item) => (
              <Grid
                container
                key={item.id || item.productId}
                sx={{ mb: 2, alignItems: 'center' }}
              >
                <Grid item xs={2} sm={1}>
                  <img
                    src={productImages[item.image]}
                    alt={item.title}
                    width="100%"
                    style={{ borderRadius: '4px' }}
                  />
                </Grid>
                <Grid item xs={6} sm={7} sx={{ pl: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Qty: {item.quantity || 1}
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ my: 2 }}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography color="textSecondary">Subtotal</Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="textSecondary">Shipping</Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  ${shipping.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Total
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: '50px',
                backgroundColor: '#212121',
                '&:hover': {
                  backgroundColor: '#424242',
                  transform: 'scale(1.02)',
                },
                transition: 'transform 0.2s',
              }}
            >
              Proceed to Payment
            </Button>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
              Your cart is empty. Nothing to checkout!
            </Typography>
            <Button
              component={Link}
              to="/shop"
              variant="contained"
              size="large"
              sx={{
                borderRadius: '50px',
                backgroundColor: '#212121',
                '&:hover': {
                  backgroundColor: '#424242',
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
