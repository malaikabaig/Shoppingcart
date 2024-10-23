import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Divider } from '@mui/material';
import Header from '../models/header';

export default function CartPage({ cart, setCart }) {
  const [subtotal, setSubtotal] = useState(0);

  // Calculate the subtotal whenever cart changes
  useEffect(() => {
    const total = cart?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cart]);

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart?.filter((item) => item.id !== id));
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Handle checkout (placeholder for actual checkout logic)
  const handleCheckout = () => {
    alert('Proceeding to checkout!');
    // You can integrate a payment gateway here or navigate to a checkout page
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 5 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>

        {cart?.length > 0 ? (
          <Grid container spacing={3}>
            {/* Display cart items */}
            <Grid item xs={12} md={8}>
              {cart?.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    marginBottom: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={item.image} // Use item image from cart data
                      alt={item.title}
                      style={{
                        width: '80px',
                        height: 'auto',
                        borderRadius: '4px',
                      }}
                    />
                    <Box sx={{ marginLeft: 2 }}>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Size: {item.size || 'Not specified'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quantity: {item.quantity}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      {item.currencyFormat}
                      {item.price * item.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ marginTop: 1 }}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))}
            </Grid>

            {/* Subtotal and Checkout Section */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">Subtotal</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {cart.length > 0 ? `$${subtotal.toFixed(2)}` : '$0.00'}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h6" color="textSecondary" sx={{ marginTop: 5 }}>
            Your cart is empty.
          </Typography>
        )}
      </Box>
    </>
  );
}
