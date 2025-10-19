import { useState } from 'react';
import { Box, Button, Grid, Typography, Container } from '@mui/material';
import productData from '../utils/products.json';
import { productImages } from '../images/images';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

export default function ShoppingContent({ setCart, userData }) {
  const array = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
  const { products } = productData.data;
  const [selectedSize, setSelectedSize] = useState(null);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    if (!userData || !userData.token) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('auth-token');
      const itemToAdd = {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      };

      // Hardcoded URL ki jaga API_URL variable use karein
      const res = await axios.post(`${API_URL}/api/cart/add`, itemToAdd, {
        headers: { 'x-auth-token': token },
      });

      setCart(res.data.items);
      alert('Product added to cart!');
    } catch (err) {
      console.error('Failed to add item to cart', err);
    }
  };

  const handleSizeSelection = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };

  const filteredProducts = selectedSize
    ? products.filter((product) =>
        product.availableSizes.includes(selectedSize)
      )
    : products;

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={2}>
          <Typography sx={{ mb: 3, fontWeight: 'bold' }}>Sizes:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {array.map((size, index) => (
              <Button
                key={index}
                onClick={() => handleSizeSelection(size)}
                sx={{
                  border:
                    selectedSize === size ? '2px solid blue' : '1px solid #ccc',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  minWidth: '48px',
                  padding: 0,
                  backgroundColor: selectedSize === size ? '#e3f2fd' : 'white',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                {size}
              </Button>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          <Typography sx={{ mb: 2 }}>
            Products found: {filteredProducts.length}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {filteredProducts?.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Box
                  sx={{
                    width: '220px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                      transform: 'scale(1.02)',
                    },
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    p: 1,
                  }}
                  onMouseOver={() => setHovered(product.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Box sx={{ position: 'relative' }}>
                    <img
                      src={
                        hovered === product.id
                          ? productImages[product.hoveredimage]
                          : productImages[product.image]
                      }
                      alt={product.title}
                      style={{
                        width: '100%',
                        height: '280px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {product.isFreeShipping
                        ? 'Free Shipping'
                        : 'Shipping charges apply'}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ pt: 2, fontWeight: '500', height: '60px' }}
                    variant="body1"
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', my: 1 }}>
                    {product.currencyFormat}
                    {product.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      width: '100%',
                      backgroundColor: 'black',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#333',
                      },
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Link>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
