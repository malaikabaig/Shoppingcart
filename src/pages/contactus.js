import React from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import Header from '../models/header';

export default function ContactUs() {
  return (
    <>
      <Header />
      <Box sx={{ padding: 5 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>

        <Typography variant="body1" gutterBottom>
          Have questions or need assistance? Reach out to us and we will get
          back to you shortly.
        </Typography>

        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Email" variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Send Message
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h6">Customer Service:</Typography>
          <Typography variant="body1">
            Email: support@clothingbrand.com
          </Typography>
          <Typography variant="body1">Phone: +1-800-123-4567</Typography>
        </Box>
      </Box>
    </>
  );
}
