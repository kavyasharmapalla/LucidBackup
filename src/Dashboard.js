import React, { useEffect, useState } from 'react';
import { Users } from './Components/Users';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab, TextField, TablePagination } from '@mui/material';

const Dashboard = () => {
    const [user, setUser] = useState([]);
    const [showAddUser, setShowAddUser] = useState(false);
    const [newUser, setNewUser] = useState({ userId: '', firstName: '', lastName: '', email: '', status: 'A' });
    const [editUserId, setEditUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [page, setPage] = useState(0);
   // const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    useEffect(() => {
        const savedUsers = JSON.parse(localStorage.getItem('users')) || Users; 
        setUser(savedUsers); 
    }, []);

    useEffect(() => {
        setUser(Users); 
    }, []);

    const handleInputChange = (e, field) => {
        setNewUser({ ...newUser, [field]: e.target.value });
    };

    const handleAddUser = () => {
        setShowAddUser(true);
    };

    const handleSaveNewUser = () => {
        if (newUser.userId && newUser.firstName && newUser.lastName) {
            const isuser = user.some(existingUser => existingUser.userId === newUser.userId);
            if(isuser){
                alert("user already exists")
            }
            else{
            setUser([...user, newUser]); 
            setNewUser({ userId: '', firstName: '', lastName: '',  status: 'A' });
            setShowAddUser(false);
            }
        } else {
            alert('Please fill in all the fields.');
        }
    };

    const handleCancelNewUser = () => {
        setShowAddUser(false);
        setNewUser({ userId: '', firstName: '', lastName: '', email: '', status: 'A' });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = (userId) => {
        if (window.confirm(`Are you sure you want to deactivate the user with ID: ${userId}?`)) {
            const deactivateUser = user.map(item =>
                item.userId === userId ? { ...item, status: 'N' } : item
            );
            setUser(deactivateUser);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = user.filter(u => {
        const matchesSearch = u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.lastName.toLowerCase().includes(searchTerm.toLowerCase());

        if (tabValue === 0) return matchesSearch; // All users
        if (tabValue === 1) return matchesSearch && u.status === 'A'; // Active users
        if (tabValue === 2) return matchesSearch && u.status === 'N'; // Inactive users
        return false;
    });

    const displayedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    return (
        <>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <TextField
                        label="Search Users"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{ width: '300px' }}
                    />
                </div>
                <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10]} 
    />
                <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} centered>
                    <Tab label="All" />
                    <Tab label="Active" />
                    <Tab label="Inactive" />
                </Tabs>
            </div>
            <TableContainer component={Paper} sx={{ marginTop: 8}}>
                <Table aria-label="user table">
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
    
</div>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>UserId</strong></TableCell>
                            <TableCell><strong>First Name</strong></TableCell>
                            <TableCell><strong>Last Name</strong></TableCell>                          
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
    {showAddUser && (
        <TableRow>
            <TableCell>
                <TextField
                    placeholder="UserId"
                    value={newUser.userId}
                    onChange={(e) => handleInputChange(e, 'userId')}
                />
            </TableCell>
            <TableCell>
                <TextField
                    placeholder="First Name"
                    value={newUser.firstName}
                    onChange={(e) => handleInputChange(e, 'firstName')}
                />
            </TableCell>
            <TableCell>
                <TextField
                    placeholder="Last Name"
                    value={newUser.lastName}
                    onChange={(e) => handleInputChange(e, 'lastName')}
                />
            </TableCell>
            <TableCell>
                <TextField
                    placeholder="Status"
                    value={newUser.status}
                    onChange={(e) => handleInputChange(e, 'status')}
                />
            </TableCell>
            <TableCell>
                <Button variant="contained" color="primary" onClick={handleSaveNewUser}>
                    Save
                </Button>
                <Button variant="contained" color="secondary" onClick={handleCancelNewUser} style={{ marginLeft: '10px' }}>
                    Cancel
                </Button>
            </TableCell>
        </TableRow>
    )}
    {displayedUsers.map((user, index) => (
        <TableRow key={index}>
            <TableCell>{user.userId}</TableCell>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>
                <Button variant="contained" color="primary" onClick={() => setEditUserId(user.userId)}>
                    Update
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(user.userId)} style={{ marginLeft: '10px' }}>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    ))}
</TableBody>

                </Table>

                <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                <Button variant="contained" color="primary" onClick={handleAddUser}>
                    Add User
                </Button>
            </div>
            </TableContainer>
        </>
    );
};

export default Dashboard;
