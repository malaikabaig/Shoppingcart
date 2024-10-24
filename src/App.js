import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutUs from './pages/aboutus';
import Cart from './pages/cart';
import ContactUs from './pages/contactus';
import ShoppingContent from './pages/shoppingcart'; // Your shop page
import NotFound from './models/notfound';
import CheckoutPage from './pages/checkout';

function App() {
  const [cart, setCart] = useState([]); // Cart state is lifted to the parent

  return (
    <Routes>
      <Route path="/" element={<ShoppingContent />} />
      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />{' '}
      {/* Define the checkout route */}
    </Routes>
  );
}

export default App;
