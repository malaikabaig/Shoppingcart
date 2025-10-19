import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  keyframes,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import productData from '../utils/products.json';
import { productImages } from '../images/images';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Home = () => {
  // Pehle 4 products feature karne ke liye
  const featuredProducts = productData.data.products.slice(0, 4);

  return (
    <Box>
      {/* ===== Hero Section (No change) ===== */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          background: 'linear-gradient(45deg, #f3e5f5 30%, #ba90c1ff 90%)',
          textAlign: 'center',
          color: '#333',
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontWeight: 'bold',
              animation: `${fadeIn} 1s ease-out`,
            }}
          >
            Style Redefined, Elegance Remastered
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            sx={{
              my: 3,
              animation: `${fadeIn} 1s ease-out 0.3s backwards`,
            }}
          >
            Discover the latest trends in fashion. Quality and style delivered
            right to your doorstep.
          </Typography>
          <Button
            component={Link}
            to="/shop"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              animation: `${fadeIn} 1s ease-out 0.6s backwards`,
              py: 1.5,
              px: 4,
              borderRadius: '50px',
              backgroundColor: '#212121',
              '&:hover': {
                backgroundColor: '#424242',
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.2s',
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* ===== Featured Products Section ===== */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product, index) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  animation: `${fadeIn} 0.5s ease-out ${
                    index * 0.15 + 0.5
                  }s backwards`,
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 280,
                    objectFit: 'cover',
                  }}
                  image={productImages[product.image]}
                  alt={product.title}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 500 }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  {/* 👇 YAHAN LINK THEEK KAR DIA HAI 👇 */}
                  <Button
                    component={Link}
                    to={`/product/${product.id}`}
                    size="small"
                    variant="outlined"
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
