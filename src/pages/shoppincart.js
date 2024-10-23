// import { useState } from 'react';
// import { Box, Button, Grid, Typography } from '@mui/material';
// import productData from '../Utilis/products.json'; // Import your JSON data
// import MyDrawer from '../models/drawer'; // Make sure to import your MyDrawer component
// import { productImages } from '../images/images';

// export default function ShoppingContent() {
//   const array = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
//   const { products } = productData.data; // Access the products array

//   // State for selected size
//   const [selectedSize, setSelectedSize] = useState(null);

//   // State for cart items
//   const [cart, setCart] = useState([]);

//   // Handle size selection
//   const handleSizeSelection = (size) => {
//     setSelectedSize(size);
//   };

//   // Handle Add to Cart
//   const handleAddToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   // Filter products based on the selected size
//   const filteredProducts = selectedSize
//     ? products.filter((product) =>
//         product.availableSizes.includes(selectedSize)
//       )
//     : products; // If no size is selected, show all products
//   console.log('cart', cart);

//   return (
//     <>
//       <MyDrawer cart={cart} />
//       <Box sx={{ mt: 5 }}>
//         <Grid
//           container
//           sx={{
//             display: 'flex',

//             flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
//           }}
//         >
//           {/* Sizes section */}
//           <Grid
//             item
//             xs={12}
//             sm={12}
//             md={2}
//             lg={2}
//             sx={{ mx: { xs: 10, sm: 15, md: 0, lg: 0 }, px: { md: 3, lg: 3 } }}
//           >
//             <Typography sx={{ mb: 3 }}>Sizes :</Typography>
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 flexWrap: 'wrap',
//                 gap: 2,
//               }}
//             >
//               {array.map((size, index) => (
//                 <Button
//                   key={index}
//                   onClick={() => handleSizeSelection(size)}
//                   sx={{
//                     border:
//                       selectedSize === size
//                         ? '2px solid blue'
//                         : '1px solid black',
//                     borderRadius: '50%',
//                     width: '40px',
//                     height: '40px',
//                     minWidth: '40px',
//                     padding: 0,
//                     backgroundColor:
//                       selectedSize === size ? '#cce4ff' : 'white',
//                   }}
//                 >
//                   {size}
//                 </Button>
//               ))}
//             </Box>
//             <Typography fontSize={15} color="textSecondary" marginTop={4}>
//               Leave a star on Github if this repository was useful :)
//             </Typography>
//           </Grid>

//           {/* Products section */}
//           <Grid
//             item
//             xs={12}
//             sm={12}
//             md={10}
//             lg={10}
//             sx={{
//               mx: { xs: 5, sm: 5, md: 0, lg: 0 },
//               px: { md: 3, lg: 3 },
//               pt: { xs: 10, md: 10 },
//             }}
//           >
//             <Typography>Products found: {filteredProducts.length}</Typography>

//             {/* Display filtered products */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 flexWrap: 'wrap',
//                 gap: 2,
//               }}
//             >
//               {filteredProducts.map((product) => (
//                 <Box
//                   key={product.id}
//                   sx={{
//                     // border: '1px solid #ddd',
//                     padding: 2,
//                     borderRadius: 2,
//                     width: '200px',
//                     textAlign: 'center',
//                   }}
//                 >
//                   {/* <img
//                     src={productImages[product.image]}
//                     alt={product.title}
//                     style={{
//                       width: '100%',
//                       height: 'auto',
//                       objectFit: 'cover',
//                       borderRadius: '4px',
//                     }}
//                   /> */}

//                   <Box sx={{ position: 'relative', width: '100%' }}>
//                     {/* Product image */}
//                     <img
//                       src={productImages[product.image]}
//                       alt={product.title}
//                       style={{
//                         width: '100%',
//                         height: 'auto',
//                         objectFit: 'cover',
//                         borderRadius: '4px',
//                       }}
//                     />

//                     {/* Free Shipping text */}
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         position: 'absolute',
//                         top: 8, // Adjust the distance from the top
//                         right: 8, // Adjust the distance from the right
//                         backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
//                         color: 'white', // Text color
//                         padding: '4px 8px', // Padding for the text box
//                         borderRadius: '4px', // Optional rounded corners
//                         fontSize: '12px', // Adjust font size if necessary
//                       }}
//                     >
//                       {product.isFreeShipping
//                         ? 'Free Shipping'
//                         : 'Shipping charges apply'}
//                     </Typography>
//                   </Box>
//                   <Typography sx={{ pt: 2 }} variant="h6">
//                     {product.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {product.style || 'No style available'}
//                   </Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                     {product.currencyFormat}
//                     {product.price}
//                   </Typography>

//                   {/* Add to Cart button */}
//                   <Button
//                     variant="contained"
//                     sx={{
//                       mt: 2,
//                       width: '100%',
//                       color: 'white',
//                       backgroundColor: 'black',
//                       height: '50px',
//                     }}
//                     onClick={() => handleAddToCart(product)}
//                   >
//                     Add to Cart
//                   </Button>
//                 </Box>
//               ))}
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// }

// import { useState } from 'react';
// import { Box, Button, Grid, Typography } from '@mui/material';
// import productData from '../Utilis/products.json';
// import MyDrawer from '../models/drawer';
// import { productImages } from '../images/images';

// export default function ShoppingContent() {
//   const array = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
//   const { products } = productData.data;
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [cart, setCart] = useState([]);
//   const [hovered, setHovered] = useState(false); // Track hovered product by ID

//   // Handle Add to Cart
//   const handleAddToCart = (product) => {
//     setCart((prevCart) => {
//       const itemExists = prevCart.find((item) => item.id === product.id);
//       if (itemExists) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   // Handle size selection
//   const handleSizeSelection = (size) => {
//     setSelectedSize(size);
//   };

//   // Filter products by selected size
//   const filteredProducts = selectedSize
//     ? products.filter((product) =>
//         product.availableSizes.includes(selectedSize)
//       )
//     : products;

//   console.log('hovered', hovered);

//   return (
//     <>
//       <MyDrawer cart={cart} setCart={setCart} />

//       {/* Sizes and Products Container */}
//       <Box sx={{ mt: 5 }}>
//         <Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
//           {/* Sizes Section */}
//           <Grid item xs={12} md={2} sx={{ pl: 5 }}>
//             <Typography sx={{ mb: 3 }}>Sizes :</Typography>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//               {array.map((size, index) => (
//                 <Button
//                   key={index}
//                   onClick={() => handleSizeSelection(size)}
//                   sx={{
//                     border:
//                       selectedSize === size
//                         ? '2px solid blue'
//                         : '1px solid black',
//                     borderRadius: '50%',
//                     width: '40px',
//                     height: '40px',
//                     minWidth: '40px',
//                     padding: 0,
//                     backgroundColor:
//                       selectedSize === size ? '#cce4ff' : 'white',
//                   }}
//                 >
//                   {size}
//                 </Button>
//               ))}
//             </Box>
//           </Grid>

//           {/* Products Section */}
//           <Grid item xs={12} md={10} sx={{ pl: 3 }}>
//             <Typography sx={{ pt: 5, pl: 2 }}>
//               Products found: {filteredProducts.length}
//             </Typography>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//               {filteredProducts?.map((product) => (
//                 // Inside your map function where images are being rendered
//                 <Box
//                   key={product.id}
//                   sx={{
//                     padding: 2,
//                     borderRadius: 2,
//                     width: '200px',
//                     textAlign: 'center',
//                     cursor: 'pointer', // Add this line for hover cursor effect
//                     '&:hover': {
//                       boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add a subtle hover effect
//                     },
//                   }}
//                   onMouseOver={() => setHovered(product.id)}
//                   onMouseLeave={() => setHovered(null)}
//                 >
//                   {/* {console.log('hoveredimage:', product.hoveredimage);
//                       console.log('image:', product.image);} */}
//                   <Box sx={{ position: 'relative' }}>
//                     {hovered === product.id ? (
//                       <img
//                         src={
//                           productImages[product.hoveredimage] // Use hovered image
//                         }
//                         alt={product.title}
//                         style={{
//                           width: '100%',
//                           objectFit: 'cover',
//                           borderRadius: '4px',
//                         }}
//                       />
//                     ) : (
//                       <img
//                         src={productImages[product.image]}
//                         alt={product.title}
//                         style={{
//                           width: '100%',
//                           objectFit: 'cover',
//                           borderRadius: '4px',
//                         }}
//                       />
//                     )}
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         position: 'absolute',
//                         top: 8,
//                         right: 8,
//                         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                         color: 'white',
//                         padding: '4px 8px',
//                         borderRadius: '4px',
//                       }}
//                     >
//                       {product.isFreeShipping
//                         ? 'Free Shipping'
//                         : 'Shipping charges apply'}
//                     </Typography>
//                   </Box>
//                   <Typography sx={{ pt: 2 }} variant="h6">
//                     {product.title}
//                   </Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                     {product.currencyFormat}
//                     {product.price}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     sx={{
//                       mt: 2,
//                       width: '100%',
//                       backgroundColor: 'black',
//                       color: 'white',
//                     }}
//                     onClick={() => handleAddToCart(product)}
//                   >
//                     Add to Cart
//                   </Button>
//                 </Box>
//               ))}
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// }

import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import productData from '../Utilis/products.json';
import MyDrawer from '../models/drawer';
import { productImages } from '../images/images';

export default function ShoppingContent() {
  const array = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
  const { products } = productData.data;
  const [selectedSize, setSelectedSize] = useState(null);
  const [cart, setCart] = useState([]);
  const [hovered, setHovered] = useState(false); // Track hovered product by ID

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Handle size selection
  const handleSizeSelection = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null); // Deselect size to show all products
    } else {
      setSelectedSize(size); // Select the size and filter products
    }
  };

  // Filter products by selected size
  const filteredProducts = selectedSize
    ? products.filter((product) =>
        product.availableSizes.includes(selectedSize)
      )
    : products; // If no size is selected, show all products

  return (
    <>
      <MyDrawer cart={cart} setCart={setCart} />

      {/* Sizes and Products Container */}
      <Box sx={{ mt: 5 }}>
        <Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Sizes Section */}
          <Grid item xs={12} md={2} sx={{ pl: 5 }}>
            <Typography sx={{ mb: 3 }}>Sizes :</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {array.map((size, index) => (
                <Button
                  key={index}
                  onClick={() => handleSizeSelection(size)}
                  sx={{
                    border:
                      selectedSize === size
                        ? '2px solid blue'
                        : '1px solid black',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    minWidth: '40px',
                    padding: 0,
                    backgroundColor:
                      selectedSize === size ? '#cce4ff' : 'white',
                  }}
                >
                  {size}
                </Button>
              ))}
            </Box>
          </Grid>

          {/* Products Section */}
          <Grid item xs={12} md={10} sx={{ pl: 3 }}>
            <Typography sx={{ pt: 5, pl: 2 }}>
              Products found: {filteredProducts.length}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {filteredProducts?.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                    width: '200px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  onMouseOver={() => setHovered(product.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Box sx={{ position: 'relative' }}>
                    {hovered === product.id ? (
                      <img
                        src={productImages[product.hoveredimage]}
                        alt={product.title}
                        style={{
                          width: '100%',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                    ) : (
                      <img
                        src={productImages[product.image]}
                        alt={product.title}
                        style={{
                          width: '100%',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {product.isFreeShipping
                        ? 'Free Shipping'
                        : 'Shipping charges apply'}
                    </Typography>
                  </Box>
                  <Typography sx={{ pt: 2 }} variant="h6">
                    {product.title}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {product.currencyFormat}
                    {product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      width: '100%',
                      backgroundColor: 'black',
                      color: 'white',
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
