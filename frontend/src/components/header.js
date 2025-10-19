// import { Box } from '@mui/material';
// import Navbar from './navbar';

// export default function Header() {
//   return (
//     <Box sx={{ textAlign: 'center' }}>
//       <Navbar />
//     </Box>
//   );
// }

import { Box } from '@mui/material';
import Navbar from './navbar';

export default function Header({ cart, setCart, userData, setUserData }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Navbar
        cart={cart}
        setCart={setCart}
        userData={userData}
        setUserData={setUserData}
      />
    </Box>
  );
}
