// import { Box, Drawer } from '@mui/material';
// import { useState } from 'react';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// export default function MyDrawer({ cart }) {
//   console.log('items in cart', cart);

//   const [open, setOpen] = useState(false);

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const DrawerList = cart.map((item) => {
//     return (
//       <Box
//         sx={{ width: 250 }}
//         role="presentation"
//         onClick={toggleDrawer(false)}
//       >
//         {item?.title}
//       </Box>
//     );
//   });

//   return (
//     <>
//       <Box
//         sx={{
//           justifyContent: 'end',
//           display: 'flex',
//           alignItems: 'flex-end',
//         }}
//       >
//         <ShoppingCartIcon fontSize="large" onClick={toggleDrawer(true)} />
//         <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
//           {DrawerList}
//         </Drawer>
//       </Box>
//     </>
//   );
// }

import { Box, Drawer, Button, Typography, IconButton } from '@mui/material';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { productImages } from '../images/images';

export default function MyDrawer({ cart, setCart }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 } // Ensure quantity exists
          : item
      )
    );
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 } // Ensure quantity exists
          : item
      )
    );
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    ); // Ensure quantity exists
  };

  const DrawerList = cart.map((item) => (
    <Box
      key={item.id}
      sx={{ display: 'flex', alignItems: 'center', padding: 2 }}
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
      <Box sx={{ flex: 1 }}>
        <Typography>{item.title}</Typography>
        <Typography>
          {item.currencyFormat}
          {item.price}
        </Typography>
      </Box>
      <Box>
        <IconButton onClick={() => handleDecreaseQuantity(item.id)}>
          <RemoveIcon />
        </IconButton>
        <Typography>{item.quantity}</Typography>
        <IconButton onClick={() => handleIncreaseQuantity(item.id)}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  ));

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <ShoppingCartIcon fontSize="large" onClick={toggleDrawer(true)} />
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <Box sx={{ width: 300, padding: 2 }}>
          {DrawerList}
          <Box sx={{ borderTop: '1px solid #ddd', paddingTop: 2 }}>
            <Typography variant="h6">
              Subtotal: ${calculateSubtotal().toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: '100%',
                backgroundColor: '#333',
                color: 'white',
                marginTop: 2,
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
