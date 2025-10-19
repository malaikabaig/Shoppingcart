import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import productData from '../utils/products.json';
import { productImages } from '../images/images';
import NotFound from '../components/notfound';

const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

const ProductPage = ({ setCart, userData }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const product = productData.data.products.find((p) => p.id === Number(id));

  const handleAddToCart = async (productToAdd) => {
    // Check if user not logged in
    if (!userData || !userData.token) {
      setSnackbarMessage('Please log in to add items. Redirecting...');
      setSnackbarSeverity('info');
      setOpenSnackbar(true);
      // 2 second timeout
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
    // If user logged in
    try {
      const token = localStorage.getItem('auth-token');
      const itemToAdd = {
        productId: productToAdd.id,
        title: productToAdd.title,
        price: productToAdd.price,
        image: productToAdd.image,
        isFreeShipping: product.isFreeShipping,
      };

      const res = await axios.post(`${API_URL}/api/cart/add`, itemToAdd, {
        headers: { 'x-auth-token': token },
      });

      setCart(res.data.items);
      setSnackbarMessage('Product added to cart!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to add item to cart', err);
      setSnackbarMessage('Failed to add product to cart.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  if (!product) {
    return <NotFound />;
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        p: { xs: 2, sm: 4 },
        background: 'linear-gradient(45deg, #f3e5f5 30%, #e1bee7 90%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={productImages[product.image]}
                alt={product.title}
                sx={{
                  width: '100%',
                  borderRadius: '12px',
                  boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                sx={{ fontWeight: 'bold' }}
                gutterBottom
              >
                {product.title}
              </Typography>
              <Typography
                variant="h4"
                color="text.primary"
                sx={{ my: 2, fontWeight: 'bold' }}
              >
                ${product.price.toFixed(2)}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" color="text.secondary" paragraph>
                {product.description ||
                  'No description available for this product. Discover the finest quality and style, designed to perfection for the modern wardrobe.'}
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  py: 1.5,
                  px: 5,
                  borderRadius: '50px',
                  backgroundColor: '#212121',
                  '&:hover': {
                    backgroundColor: '#424242',
                    transform: 'scale(1.02)',
                  },
                  transition: 'transform 0.2s',
                  alignSelf: 'flex-start',
                }}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductPage;
