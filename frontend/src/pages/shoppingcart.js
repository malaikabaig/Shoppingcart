import { useState } from 'react';
import { Box, Button, Grid, Typography, Container, Paper } from '@mui/material';
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
    setSelectedSize(selectedSize === size ? null : size);
  };

  const filteredProducts = selectedSize
    ? products.filter((product) =>
        product.availableSizes.includes(selectedSize)
      )
    : products;

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 2, sm: 4 },
        background: 'linear-gradient(45deg, #f3e5f5 30%, #e1bee7 90%)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={2}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Sizes:</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  justifyContent: 'center',
                }}
              >
                {array.map((size) => (
                  <Button
                    key={size}
                    onClick={() => handleSizeSelection(size)}
                    sx={{
                      border:
                        selectedSize === size
                          ? '2px solid #6a1b9a'
                          : '1px solid #ccc',
                      borderRadius: '50%',
                      width: '48px',
                      height: '48px',
                      minWidth: '48px',
                      padding: 0,
                      backgroundColor:
                        selectedSize === size ? '#e1bee7' : 'white',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography sx={{ mb: 2, color: '#333', fontWeight: 500 }}>
              Showing {filteredProducts.length} Products
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {filteredProducts?.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      width: '240px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0px 10px 25px rgba(106, 27, 154, 0.2)', // Navbar-inspired shadow
                      },
                    }}
                    onMouseOver={() => setHovered(product.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <img
                        src={
                          hovered === product.id && product.hoveredimage
                            ? productImages[product.hoveredimage]
                            : productImages[product.image]
                        }
                        alt={product.title}
                        style={{
                          width: '100%',
                          height: '300px',
                          objectFit: 'cover',
                        }}
                      />
                      {product.isFreeShipping && (
                        <Typography
                          variant="caption"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '12px',
                          }}
                        >
                          Free Shipping
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Typography
                        sx={{ fontWeight: '500', height: '48px' }}
                        variant="body1"
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', my: 1 }}
                      >
                        {product.currencyFormat}
                        {product.price.toFixed(2)}
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          backgroundColor: '#212121',
                          color: 'white',
                          borderRadius: '50px',
                          py: 1,
                          '&:hover': { backgroundColor: '#424242' },
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Paper>
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
