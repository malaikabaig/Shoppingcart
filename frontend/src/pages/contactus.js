import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Paper,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ContactUs() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { fullName, email, message };
    console.log('Form Submitted:', formData);
    alert('Thank you for your message! We will get back to you shortly.');
    setFullName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        p: { xs: 2, sm: 4 },
        background: 'linear-gradient(45deg, #f3e5f5 30%, #e1bee7 90%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            borderRadius: '12px',
            p: { xs: 2, sm: 4 },
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Have questions or need assistance? Reach out to us and we will get
            back to you shortly.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: '50px',
                    py: 1.5,
                    px: 5,
                    backgroundColor: '#212121',
                    '&:hover': { backgroundColor: '#424242' },
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 5, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Our Contact Details
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 2,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                <EmailIcon sx={{ mr: 1, color: '#6a1b9a' }} />
                <Typography variant="body1">developer.mtb@gmail.com</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mx: 2,
                  mt: { xs: 1, sm: 0 },
                }}
              >
                <PhoneIcon sx={{ mr: 1, color: '#6a1b9a' }} />
                <Typography variant="body1">+92 304 3692624</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
