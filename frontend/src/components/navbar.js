// import { Box } from '@mui/material';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <Box
//       sx={{
//         py: 5,
//         px: { xs: 5, sm: 10, md: 15, lg: 25 },
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-center',
//         width: '100%',
//         gap: 2,
//         backgroundColor: 'lavender',
//       }}
//     >
//       <nav>
//         <Link to="/" style={{ marginRight: '20px' }}>
//           SHOP
//         </Link>
//         <Link to="/cart" style={{ marginRight: '20px' }}>
//           CART
//         </Link>
//         <Link to="/contactus" style={{ marginRight: '20px' }}>
//           CONTACT US
//         </Link>
//         <Link to="/aboutus">ABOUT US</Link>
//       </nav>
//     </Box>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Drawer,
  Box,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { productImages } from '../images/images';
import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

const Navbar = ({ cart, setCart, userData, setUserData }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  // Profile Menu Functions
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };
  const handleLogout = () => {
    setUserData({ token: undefined, user: undefined });
    setCart([]);
    localStorage.setItem('auth-token', '');
    navigate('/');
    handleMenuClose();
  };

  // Drawer and Cart Meta Functions
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const calculateTotalQuantity = () =>
    cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  const handleCheckout = () => {
    if (!userData.token) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
    setDrawerOpen(false);
  };
  const handleCart = () => {
    setDrawerOpen(false);
    navigate('/cart');
  };

  const updateCartInDB = async (productId, quantity) => {
    if (quantity < 1) {
      removeItemFromCart(productId);
      return;
    }
    if (!userData.token) return;

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

  const removeItemFromCart = async (productId) => {
    if (!userData.token) return;
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

  const drawerContent = (
    <Box
      sx={{
        width: 300,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'linear-gradient(180deg, #f3e5f5 0%, #e1bee7 100%)',
      }}
      role="presentation"
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333' }}
      >
        Shopping Cart
      </Typography>

      {/* Cart Items Section */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <Box
              key={item.productId}
              sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
            >
              <img
                src={productImages[item.image]}
                alt={item.title}
                style={{
                  width: '60px',
                  height: '80px',
                  objectFit: 'cover',
                  marginRight: '16px',
                  borderRadius: '8px',
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>
                <Typography color="text.secondary">
                  ${item.price.toFixed(2)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleDecreaseQuantity(item.productId)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleIncreaseQuantity(item.productId)}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Typography
            sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}
          >
            Your cart is empty.
          </Typography>
        )}
      </Box>

      {cart && cart.length > 0 && (
        <Box
          sx={{
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            mt: 'auto',
            pt: 2,

            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(5px)',
            mx: -2,
            px: 2,
            pb: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Subtotal:
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              ${calculateSubtotal().toFixed(2)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleCheckout}
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: '50px',
              backgroundColor: '#212121',
              '&:hover': { backgroundColor: '#424242' },
            }}
          >
            CHECKOUT
          </Button>
          <Button
            variant="outlined"
            onClick={handleCart}
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: '50px',
              borderColor: '#212121',
              color: '#212121',
              '&:hover': {
                backgroundColor: 'rgba(33, 33, 33, 0.1)',
                borderColor: '#212121',
              },
            }}
          >
            VIEW CART
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={1}
        sx={{
          background: 'linear-gradient(45deg, #43184aff 30%, #d0bad4ff 90%)',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',

            backgroundColor: 'transparent',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: '40px', marginRight: '10px' }}
              />
              My Shop
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/shop">
              Shop
            </Button>
            <Button color="inherit" component={Link} to="/aboutus">
              About Us
            </Button>
            <Button color="inherit" component={Link} to="/contactus">
              Contact Us
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <Badge badgeContent={calculateTotalQuantity()} color="error">
                <ShoppingCartIcon sx={{ color: '#43184aff' }} />
              </Badge>
            </IconButton>
            {userData && userData.user ? (
              <>
                <IconButton onClick={handleMenuClick} sx={{ p: 0, ml: 2 }}>
                  <Avatar
                    alt={userData.user.username}
                    src={userData.user.avatar}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ color: '#43184aff' }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/signup"
                  sx={{ color: '#43184aff' }}
                >
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
