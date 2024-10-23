import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box
      sx={{
        py: 5,
        px: { xs: 5, sm: 10, md: 15, lg: 25 },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-center',
        width: '100%',
        gap: 2,
        backgroundColor: 'lavender',
      }}
    >
      <nav>
        <Link to="/" style={{ marginRight: '20px' }}>
          SHOP
        </Link>
        <Link to="/cart" style={{ marginRight: '20px' }}>
          CART
        </Link>
        <Link to="/contactus" style={{ marginRight: '20px' }}>
          CONTACT US
        </Link>
        <Link to="/aboutus">ABOUT US</Link>
      </nav>
    </Box>
  );
};

export default Navbar;
