import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import AdminDashboard from './pages/AdminDashboard';
import CreateEvent from './pages/CreateEvent';
import RegisterEvent from './pages/RegisterEvent';
import Attendance from './pages/Attendance';
import Feedback from './pages/Feedback';
import './index.css';

// Root redirect: if logged in, go to dashboard; otherwise, go to login
const RootRedirect = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="transition-screen">
        <div className="spinner"></div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
};

// Layout wrapper that conditionally shows navbar/footer
const AppLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      {isAuthenticated && <Navbar />}
      <main className="main-content">{children}</main>
      {isAuthenticated && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <AppLayout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<RootRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Admin-only routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/create"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/attendance"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Attendance />
                  </ProtectedRoute>
                }
              />

              {/* Student-only routes */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute requiredRole="student">
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/event/:id"
                element={
                  <ProtectedRoute requiredRole="student">
                    <EventDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/register/:id"
                element={
                  <ProtectedRoute requiredRole="student">
                    <RegisterEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/feedback/:id"
                element={
                  <ProtectedRoute requiredRole="student">
                    <Feedback />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<RootRedirect />} />
            </Routes>
          </AppLayout>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
 
