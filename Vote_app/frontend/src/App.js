import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import AdminControls from './pages/AdminControls';
import RegisterUser from './pages/RegisterUser';
import RegisterCandidate from './pages/RegisterCandidate';
import Placevote from './pages/Placevote'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admincontrols" element={<AdminControls />} />
        <Route path="/registeruser" element={<RegisterUser />} />
        <Route path="/registercandidate" element={<RegisterCandidate />} />
        <Route path="/Placevote" element={<Placevote />} /> 
      </Routes>
    </Router>
  );
};

export default App;
