import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Header from '../models/header';
import { productImages } from '../images/images'; // Import product images

export default function Cart({ cart, setCart }) {
  const [subtotal, setSubtotal] = useState(0);

  // Calculate the subtotal whenever cart changes
  useEffect(() => {
    console.log('cart : ', cart);
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

  // Handle increasing quantity
  const handleIncreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  // Handle decreasing quantity
  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = (item.quantity || 1) - 1;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Handle checkout (placeholder for actual checkout logic)
  const handleCheckout = () => {
    alert('Proceeding to checkout!');
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          pt: 10,
          minHeight: '100vh', // Ensure the container takes up the full viewport height
          display: 'flex', // Use flexbox for centering
          justifyContent: 'center', // Center horizontally
          alignItems: 'start', // Center vertically
          backgroundColor: '#f0f0f0', // Background color for the entire viewport (optional)
        }}
      >
        <Box
          sx={{
            padding: { xs: 3, md: 5 },
            maxWidth: 600, // Max width of the inner box
            width: '100%', // Allow the box to shrink for smaller screens
            border: '1px solid #ddd',
            borderRadius: 4,
            backgroundColor: 'lavender', // Box background color
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow
            textAlign: 'center', // Center the content inside the box
          }}
        >
          <Typography variant="h4" gutterBottom>
            Your Cart
          </Typography>

          {cart?.length > 0 ? (
            <Grid
              container
              spacing={3}
              sx={{
                maxWidth: { xs: '100%', md: '80%' }, // Full width on mobile, centered on larger screens
              }}
            >
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
                      backgroundColor: 'white',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={productImages[item.image]} // Consistent image source
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
                        {/* Quantity control buttons */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 1,
                          }}
                        >
                          <IconButton
                            onClick={() => handleDecreaseQuantity(item.id)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>{item.quantity}</Typography>
                          <IconButton
                            onClick={() => handleIncreaseQuantity(item.id)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
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
                    backgroundColor: 'white',
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
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ marginTop: 5, textAlign: 'center' }}
            >
              Your cart is empty.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
