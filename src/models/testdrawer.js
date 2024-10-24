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
