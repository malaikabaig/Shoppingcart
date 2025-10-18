import React from 'react';
import { Typography, Container, Avatar, Paper } from '@mui/material';

const Profile = ({ userData }) => {
  if (!userData || !userData.user) {
    return (
      <Container>
        <Typography sx={{ mt: 4, textAlign: 'center' }}>
          Loading profile or please log in to view...
        </Typography>
      </Container>
    );
  }

  const { username, email, avatar } = userData.user;

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Avatar
          src={avatar}
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            border: '2px solid #ddd',
          }}
        />
        <Typography variant="h6">Username: {username}</Typography>
        <Typography variant="body1" color="text.secondary">
          Email: {email}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Profile;
