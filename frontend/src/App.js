import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EventDetails from './pages/EventDetails';
import AdminDashboard from './pages/AdminDashboard';
import CreateEvent from './pages/CreateEvent';
import RegisterEvent from './pages/RegisterEvent';
import Attendance from './pages/Attendance';
import Feedback from './pages/Feedback';
import './index.css';

function App() {
  const [role, setRole] = useState('student'); // Default role
  const [isSwitching, setIsSwitching] = useState(false);

  const handleRoleSwitch = (newRole) => {
    setIsSwitching(true);
    // Wait for 1 second showing a blank/loading screen before switching
    setTimeout(() => {
      setRole(newRole);
      setIsSwitching(false);
    }, 1000);
  };

  return (
    <Router>
      <div className="app">
        <Navbar role={role} onRoleSwitch={handleRoleSwitch} />
        <main className="main-content">
          {isSwitching ? (
            <div className="transition-screen">
              <div className="spinner"></div>
              <h2>Switching to {role === 'student' ? 'Admin' : 'Student'} Portal...</h2>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/register/:id" element={<RegisterEvent />} />
              <Route path="/feedback/:id" element={<Feedback />} />
              {role === 'admin' ? (
                <>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/create" element={<CreateEvent />} />
                  <Route path="/admin/attendance" element={<Attendance />} />
                  <Route path="*" element={<Navigate to="/admin" />} />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/" />} />
              )}
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

