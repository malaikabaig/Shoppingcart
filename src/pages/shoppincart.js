import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import productData from '../Utilis/products.json'; // Import your JSON data
import MyDrawer from '../models/drawer'; // Make sure to import your MyDrawer component

export default function ShoppingContent() {
  const array = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
  const { products } = productData.data; // Access the products array

  // State for selected size
  const [selectedSize, setSelectedSize] = useState(null);

  // State for cart items
  const [cart, setCart] = useState([]);

  // Handle size selection
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Filter products based on the selected size
  const filteredProducts = selectedSize
    ? products.filter((product) =>
        product.availableSizes.includes(selectedSize)
      )
    : products; // If no size is selected, show all products

  return (
    <>
      <MyDrawer cart={cart} />
      <Box sx={{ mt: 5 }}>
        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
          }}
        >
          {/* Sizes section */}
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={2}
            sx={{ mx: { xs: 10, sm: 15, md: 0, lg: 0 }, px: { md: 3, lg: 3 } }}
          >
            <Typography sx={{ mb: 3 }}>Sizes :</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
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
            <Typography fontSize={15} color="textSecondary" marginTop={4}>
              Leave a star on Github if this repository was useful :)
            </Typography>
          </Grid>

          {/* Products section */}
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            lg={10}
            sx={{
              mx: { xs: 5, sm: 5, md: 0, lg: 0 },
              px: { md: 3, lg: 3 },
              pt: { xs: 10, md: 10 },
            }}
          >
            <Typography>Products found: {filteredProducts.length}</Typography>

            {/* Display filtered products */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {filteredProducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    border: '1px solid #ddd',
                    padding: 2,
                    borderRadius: 2,
                    width: '200px',
                  }}
                >
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.style || 'No style available'}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {product.currencyFormat}
                    {product.price}
                  </Typography>
                  <Typography variant="body2">
                    {product.isFreeShipping
                      ? 'Free Shipping'
                      : 'Shipping charges apply'}
                  </Typography>
                  {/* Add to Cart button */}
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
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
