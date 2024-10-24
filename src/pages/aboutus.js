import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

import Header from '../models/header';

export default function AboutUs() {
  return (
    <>
      <Header />

      <Box sx={{ padding: 5 }}>
        <Typography variant="h4" gutterBottom>
          About Our Brand
        </Typography>

        <Typography variant="body1" gutterBottom>
          Welcome to our clothing brand! We believe that fashion is not just
          about the latest trends, but also about expressing your unique
          personality. Our mission is to provide high-quality, stylish, and
          affordable clothing for everyone.
        </Typography>

        <Typography variant="body1" gutterBottom>
          At our core, we are committed to sustainability and ethical fashion.
          Our materials are sourced responsibly, and we partner with
          manufacturers who share our values.
        </Typography>

        <Grid container spacing={3} sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Our Story</Typography>
            <Typography variant="body1">
              Founded in 2020, our brand started with a vision to revolutionize
              the fashion industry by offering timeless pieces with a modern
              twist. What began as a small passion project has grown into a
              global brand loved by people all over the world.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Our Values</Typography>
            <Typography variant="body1">
              - Quality: We ensure the highest standard in every product.
              <br />
              - Sustainability: We are dedicated to minimizing our environmental
              impact.
              <br />
              - Innovation: We are always seeking new ways to improve and
              innovate in fashion.
              <br />- Customer-Centric: We focus on providing the best
              experience for our customers.
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h6">Follow Us:</Typography>
          <Typography variant="body1">
            Instagram | Facebook | Twitter
          </Typography>
        </Box>
      </Box>
    </>
  );
}
