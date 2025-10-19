import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Divider,
  IconButton,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { productImages } from '../images/images';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

export default function Cart({ cart, setCart }) {
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = cart?.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    setSubtotal(total);
  }, [cart]);

  const updateCartInDB = async (productId, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    try {
      const token = localStorage.getItem('auth-token');
      const res = await axios.post(
        `${API_URL}/api/cart/update-quantity`,
        { productId, quantity },
        { headers: { 'x-auth-token': token } }
      );
      setCart(res.data.items);
    } catch (err) {
      console.error('Failed to update quantity', err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem('auth-token');
      const res = await axios.post(
        `${API_URL}/api/cart/remove-item`,
        { productId },
        { headers: { 'x-auth-token': token } }
      );
      setCart(res.data.items);
    } catch (err) {
      console.error('Failed to remove item', err);
    }
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      await axios.post(
        `${API_URL}/api/cart/clear`,
        {},
        {
          headers: { 'x-auth-token': token },
        }
      );
      setCart([]);
    } catch (err) {
      console.error('Failed to clear cart', err);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const item = cart.find((p) => p.productId === productId);
    if (item) {
      updateCartInDB(productId, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const item = cart.find((p) => p.productId === productId);
    if (item) {
      updateCartInDB(productId, item.quantity - 1);
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
        alignItems: 'flex-start',
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            borderRadius: '12px',
            p: { xs: 2, sm: 4 },
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Shopping Cart
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {cart && cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <React.Fragment key={item.productId}>
                  <Grid
                    container
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 2 }}
                  >
                    <Grid item xs={12} sm={2} md={1}>
                      <img
                        src={productImages[item.image]}
                        alt={item.title}
                        style={{ width: '100%', borderRadius: '8px' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={5}>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body1">
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={3}
                      md={3}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleDecreaseQuantity(item.productId)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleIncreaseQuantity(item.productId)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={4} sm={2} md={2} sx={{ textAlign: 'right' }}>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={1} md={1} sx={{ textAlign: 'right' }}>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                </React.Fragment>
              ))}

              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearCart}
                  sx={{ mb: { xs: 2, sm: 0 } }}
                >
                  Clear Cart
                </Button>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h5">
                    Subtotal: ${subtotal.toFixed(2)}
                  </Typography>
                  <Button
                    component={Link}
                    to="/checkout"
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 1,
                      py: 1,
                      px: 4,
                      borderRadius: '50px',
                      backgroundColor: '#212121',
                      '&:hover': { backgroundColor: '#424242' },
                    }}
                  >
                    Checkout
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
                Your cart is empty.
              </Typography>
              <Button
                component={Link}
                to="/shop"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '50px',
                  py: 1.5,
                  px: 5,
                  backgroundColor: '#212121',
                  '&:hover': { backgroundColor: '#424242' },
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
