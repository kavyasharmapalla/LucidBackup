import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Paper, Typography, Container } from '@mui/material';

const AddUser = ({ addedUser }) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        status: 'Active'
    });

    const navigate = useNavigate(); // Initialize navigate to handle navigation

    // Handle input changes in the form
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addedUser(user);
        navigate('/'); // Redirect back to the Dashboard after adding the user
    };

    return (
        <Container component={Paper} maxWidth="sm" style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Add New User
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInput}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInput}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInput}
                    fullWidth
                    margin="normal"
                    required
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                        Save User
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default AddUser;
