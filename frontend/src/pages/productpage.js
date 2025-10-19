import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import productData from '../utils/products.json';
import { productImages } from '../images/images';
import NotFound from '../components/notfound';

const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

const ProductPage = ({ setCart, userData }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // URL ki string ID ko Number mein convert karke === se check karein
  const product = productData.data.products.find((p) => p.id === Number(id));

  const handleAddToCart = async (productToAdd) => {
    if (!userData || !userData.token) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('auth-token');
      const itemToAdd = {
        productId: productToAdd.id,
        title: productToAdd.title,
        price: productToAdd.price,
        image: productToAdd.image,
      };

      const res = await axios.post(`${API_URL}/api/cart/add`, itemToAdd, {
        headers: { 'x-auth-token': token },
      });

      setCart(res.data.items);
      alert('Product added to cart!');
    } catch (err) {
      console.error('Failed to add item to cart', err);
    }
  };

  if (!product) {
    return <NotFound />;
  }

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={productImages[product.image]}
            alt={product.title}
            sx={{ width: '100%', borderRadius: '12px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography component="h1" variant="h3" gutterBottom>
            {product.title}
          </Typography>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{ my: 2, fontWeight: 'bold' }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {product.description ||
              'Is product ki description available nahi hai. Behtareen quality aur style, aapke liye design kiya gaya.'}
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              py: 1.5,
              px: 5,
              backgroundColor: '#212121',
              '&:hover': { backgroundColor: '#424242' },
            }}
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
