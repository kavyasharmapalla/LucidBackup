import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleRedirect = () => {
    navigate('/dashboard'); // Redirect to the dashboard route
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the UserManagement Application
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirect}
        style={{ marginTop: '20px' }}
      >
        Go to Dashboard
      </Button>
    </Container>
  );
}

export default LandingPage;
