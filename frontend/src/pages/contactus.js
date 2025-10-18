// import React from 'react';
// import { Box, Typography, TextField, Button, Grid } from '@mui/material';
// import Header from '../models/header';
// import { useDispatch, useSelector } from 'react-redux';
// import { increment, decrement } from '../redux/reducer/reducer';

// export default function ContactUs() {
//   const value = useSelector((state) => state.counter.value);
//   const dispatch = useDispatch();
//   return (
//     <>
//       <Header />
//       <Button
//         variant="outlined"
//         aria-label="Increase"
//         onClick={() => dispatch(increment())}
//       >
//         Increment
//       </Button>
//       <p>{value}</p>
//       <Button
//         variant="outlined"
//         aria-label="Decrease"
//         onClick={() => dispatch(decrement())}
//       >
//         Decrement
//       </Button>
//       <Box sx={{ padding: 5 }}>
//         <Typography variant="h4" gutterBottom>
//           Contact Us
//         </Typography>

//         <Typography variant="body1" gutterBottom>
//           Have questions or need assistance? Reach out to us and we will get
//           back to you shortly.
//         </Typography>

//         <Grid container spacing={2} sx={{ marginTop: 3 }}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               label="Full Name"
//               variant="outlined"
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField label="Email" variant="outlined" fullWidth required />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Message"
//               variant="outlined"
//               multiline
//               rows={4}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary">
//               Send Message
//             </Button>
//           </Grid>
//         </Grid>

//         <Box sx={{ marginTop: 5 }}>
//           <Typography variant="h6">Customer Service:</Typography>
//           <Typography variant="body1">
//             Email: support@clothingbrand.com
//           </Typography>
//           <Typography variant="body1">Phone: +1-800-123-4567</Typography>
//         </Box>
//       </Box>
//     </>
//   );
// }
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from '@mui/material';

export default function ContactUs() {
  // Step 1: Har input field ke liye state banayein
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Step 2: Form submit karne ke liye function banayein
  const handleSubmit = (event) => {
    event.preventDefault(); // Page ko reload hone se rokein

    // Form ka data aek object mein jama karein
    const formData = {
      fullName: fullName,
      email: email,
      message: message,
    };

    // Abhi ke liye, hum is data ko console par dikhayenge
    console.log('Form Submitted:', formData);
    alert('Thank you for your message! We will get back to you shortly.');

    // Form ko khali kar dein
    setFullName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ padding: 5 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>

        <Typography variant="body1" gutterBottom>
          Have questions or need assistance? Reach out to us and we will get
          back to you shortly.
        </Typography>

        {/* Step 3: Form tag add karein aur handleSubmit ko jorein */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                value={fullName} // State se value lein
                onChange={(e) => setFullName(e.target.value)} // State ko update karein
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
              {/* Button ka type "submit" karein */}
              <Button type="submit" variant="contained" color="primary">
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginTop: 5 }}>
          <Typography variant="h6">Customer Service:</Typography>
          <Typography variant="body1">
            Email: support@clothingbrand.com
          </Typography>
          <Typography variant="body1">Phone: +1-800-123-4567</Typography>
        </Box>
      </Box>
    </Container>
  );
}
