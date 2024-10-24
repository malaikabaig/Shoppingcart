import {
  Box,
  Drawer,
  Button,
  Typography,
  IconButton,
  Badge,
} from '@mui/material';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { useSelector } from 'react-redux';

import { productImages } from '../images/images';

export default function MyDrawer({ cart, setCart }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleCheckout = () => {
    setOpen(false); // Close the drawer
    navigate('/checkout'); // Programmatically navigate to checkout page
  };

  const handleCart = () => {
    navigate('/cart'); // Programmatically navigate to checkout page
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  // Handle quantity decrease
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

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  // Calculate total quantity of items in the cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const DrawerList = cart.map((item) => (
    <Box
      key={item.id}
      sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}
    >
      <img
        src={productImages[item.image]}
        alt={item.title}
        style={{
          width: '50px',
          height: '50px',
          objectFit: 'cover',
          marginRight: '16px',
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Typography>{item.title}</Typography>
          <Typography>
            {item.currencyFormat}
            {item.price}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: 250,
          }}
        >
          <IconButton
            size="small"
            onClick={() => handleDecreaseQuantity(item.id)}
          >
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ mt: 0.5 }}>{item.quantity}</Typography>
          <IconButton
            size="small"
            onClick={() => handleIncreaseQuantity(item.id)}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  ));

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        {/* Add Badge component to show the total quantity in a superscript */}
        <IconButton onClick={toggleDrawer(true)} aria-label="cart">
          <Badge
            badgeContent={calculateTotalQuantity()} // Total items in the cart
            color="error"
            invisible={calculateTotalQuantity() === 0} // Hide if no items in cart
          >
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <Box
          sx={{
            width: 300,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {DrawerList}
          <Box
            sx={{
              borderTop: '1px solid #ddd',
              marginTop: 'auto',
              paddingTop: 2,
              backgroundColor: '#272727',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', pl: 2 }}>
              Subtotal: ${calculateSubtotal().toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              onClick={handleCheckout}
              sx={{
                width: '100%',
                backgroundColor: '#333',
                color: 'white',
                marginTop: 2,
              }}
            >
              CHECKOUT
            </Button>
            <Button
              variant="contained"
              onClick={handleCart}
              sx={{
                width: '100%',
                backgroundColor: '#333',
                color: 'white',
                marginTop: 2,
              }}
            >
              GO TO CART
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
