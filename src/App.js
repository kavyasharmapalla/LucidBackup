import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddUser from './Components/AddUser';




function App() {  
  const [users, setUsers] = useState([]);
  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };
  return (
    <Router>
      <Routes>       
      <Route path="/" element={<Dashboard users={users} />} />  
      <Route path="/adduser" element={<AddUser addedUser={addUser} />} />     
       
      </Routes>
    </Router>
  );
}

export default App;
