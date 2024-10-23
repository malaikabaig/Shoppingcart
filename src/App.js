// // import MyDrawer from './models/drawer';
// import ShoppingContent from './pages/shoppincart';
// import Header from './models/header';
// import { BrowserRouter as Router, Routes, } from 'react-router-dom';
// // import List from '@mui/material/List';
// // import ListItem from '@mui/material/ListItem';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import ListItemText from '@mui/material/ListItemText';

// function App() {
//   return (
//     <Router >
//       <>
//       {/* this is the page content */}
//       <Header />
//       <ShoppingContent />
//     </>
//     </Router>
//   );
// }

// export default App;

import { Routes, Route } from 'react-router-dom';
import AboutUs from './pages/aboutus';
import Cart from './pages/cart';
import ContactUs from './pages/contactus';
import ShoppingContent from './pages/shoppingcart'; // Your shop page
import NotFound from './models/notfound';
function App() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingContent />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
