import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import aboutUsFashionImage from '../images/aboutusfashion.jpg';

export default function AboutUs() {
  const values = [
    {
      icon: <CheckCircleOutlineIcon sx={{ color: '#6a1b9a' }} />,
      text: 'Quality: We ensure the highest standard in every product.',
    },
    {
      icon: <CheckCircleOutlineIcon sx={{ color: '#6a1b9a' }} />,
      text: 'Sustainability: We are dedicated to minimizing our environmental impact.',
    },
    {
      icon: <CheckCircleOutlineIcon sx={{ color: '#6a1b9a' }} />,
      text: 'Innovation: We are always seeking new ways to improve in fashion.',
    },
    {
      icon: <CheckCircleOutlineIcon sx={{ color: '#6a1b9a' }} />,
      text: 'Customer-Centric: We focus on providing the best experience.',
    },
  ];

  return (
    <Box sx={{ background: '#fff' }}>
      {/*  HERO SECTION*/}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '50vh', md: '60vh' },
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          p: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          },
          backgroundImage:
            'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Our Story
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '700px' }}>
            Founded in 2020, our brand started with a vision to revolutionize
            fashion by offering timeless pieces with a modern twist.
          </Typography>
        </Box>
      </Box>

      {/* HEART OF OUR BRAND */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 6 }}
        >
          The Heart of Our Brand
        </Typography>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={aboutUsFashionImage}
              alt="Western Fashion"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '450px',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: '2px solid #502c57ff',
                borderRadius: '12px',
                p: 3.5,
                backgroundColor: '#e1bee7',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 500, mb: 3 }}>
                Our Core Values
              </Typography>
              <List>
                {values.map((item, index) => (
                  <ListItem key={index} disableGutters sx={{ py: 1 }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{ fontSize: '1.1rem' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* SOCIAL MEDIA SECTION */}
      <Box sx={{ background: '#f5f5f5', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" color="text.secondary">
            Follow Us On Social Media
          </Typography>
          <Box sx={{ mt: 2 }}>
            <InstagramIcon
              sx={{
                mx: 2,
                fontSize: 35,
                cursor: 'pointer',
                '&:hover': { color: '#C13584', transform: 'scale(1.1)' },
                transition: '0.2s',
              }}
            />
            <FacebookIcon
              sx={{
                mx: 2,
                fontSize: 35,
                cursor: 'pointer',
                '&:hover': { color: '#1877F2', transform: 'scale(1.1)' },
                transition: '0.2s',
              }}
            />
            <TwitterIcon
              sx={{
                mx: 2,
                fontSize: 35,
                cursor: 'pointer',
                '&:hover': { color: '#1DA1F2', transform: 'scale(1.1)' },
                transition: '0.2s',
              }}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
