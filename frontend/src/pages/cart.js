import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Divider,
  IconButton,
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

  // --- NAYE AUR UPDATED CART FUNCTIONS JO BACKEND SE BAAT KARTE HAIN ---

  const updateCartInDB = async (productId, quantity) => {
    // Agar quantity 0 se kam ho jaye to item remove kar do
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

  const handleClearCart = () => {
    // Iske liye bhi aek backend route ban sakta hai, فی الحال yeh local hai.
    setCart([]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Cart
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {cart && cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <React.Fragment key={item.productId}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    mb: 2,
                  }}
                >
                  <img
                    src={productImages[item.image]}
                    alt={item.title}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      marginRight: '16px',
                      borderRadius: '8px',
                    }}
                  />
                  <Box
                    sx={{ flexGrow: 1, width: '100%', mt: { xs: 2, sm: 0 } }}
                  >
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body1">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      my: { xs: 2, sm: 0 },
                    }}
                  >
                    <IconButton
                      onClick={() => handleDecreaseQuantity(item.productId)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <IconButton
                      onClick={() => handleIncreaseQuantity(item.productId)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ width: '100px', textAlign: 'right', mx: 2 }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                {index < cart.length - 1 && <Divider sx={{ my: 2 }} />}
              </React.Fragment>
            ))}
            <Divider sx={{ my: 3 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={handleClearCart}
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
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6" color="text.secondary">
              Your cart is empty.
            </Typography>
            <Button
              component={Link}
              to="/shop"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
