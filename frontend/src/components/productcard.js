import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import { keyframes } from '@mui/system';
import { Link } from 'react-router-dom';

// Define fade-in animation
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

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        },
        // Apply the animation here
        animation: `${fadeIn} 0.5s ease-out forwards`,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 280,
          objectFit: 'cover',
        }}
        image={product.imageUrl}
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
  );
};

export default ProductCard;
