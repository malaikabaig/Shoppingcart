// import { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import AboutUs from './pages/aboutus';
// import Cart from './pages/cart';
// import ContactUs from './pages/contactus';
// import ShoppingContent from './pages/shoppingcart'; // Your shop page
// import NotFound from './models/notfound';
// import CheckoutPage from './pages/checkout';

// function App() {
//   const [cart, setCart] = useState([]); // Cart state is lifted to the parent

//   return (
//     <Routes>
//       <Route path="/" element={<ShoppingContent />} />
//       <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
//       <Route path="/contactus" element={<ContactUs />} />
//       <Route path="/aboutus" element={<AboutUs />} />
//       <Route path="*" element={<NotFound />} />
//       <Route path="/checkout" element={<CheckoutPage cart={cart} />} />{' '}
//       {/* Define the checkout route */}
//     </Routes>
//   );
// }

// export default App;

import { Box, Typography, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/aboutus';
import Cart from './pages/cart';
import ContactUs from './pages/contactus';
import ShoppingContent from './pages/shoppingcart';
import NotFound from './components/notfound';
import CheckoutPage from './pages/checkout';
import Header from './components/header';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import ProductPage from './pages/productpage';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';

const API_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

function App() {
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }

      if (token) {
        try {
          const userRes = await axios.get(`${API_URL}/api/users/`, {
            headers: { 'x-auth-token': token },
          });
          setUserData({
            token,
            user: userRes.data,
          });

          const cartRes = await axios.get(`${API_URL}/api/cart/`, {
            headers: { 'x-auth-token': token },
          });
          setCart(cartRes.data.items || []);
        } catch (err) {
          console.log('Token is not valid, logging out.');
          setUserData({ token: undefined, user: undefined });
          localStorage.setItem('auth-token', '');
        }
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <Header
        cart={cart}
        setCart={setCart}
        userData={userData}
        setUserData={setUserData}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={<ShoppingContent setCart={setCart} userData={userData} />}
        />

        <Route
          path="/product/:id"
          element={<ProductPage setCart={setCart} userData={userData} />}
        />

        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path="/login"
          element={<Login setUserData={setUserData} setCart={setCart} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile userData={userData} />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      </Routes>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          background: 'linear-gradient(45deg, #f3e5f5 30%, #ba90c1ff 90%)',
          textAlign: 'center',
          borderTop: '1px solid #ddd',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="body1"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Developed with &nbsp;
            <FavoriteIcon sx={{ color: '#d81b60', fontSize: '1rem' }} />
            &nbsp; by Malaika Tayyab
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            © {new Date().getFullYear()} My Shop. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default App;
