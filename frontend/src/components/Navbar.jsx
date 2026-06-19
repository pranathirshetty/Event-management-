import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FiCalendar, FiLogOut, FiLayout, FiPlusSquare, FiUser, FiZap, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
    closeMenu();
  };

  const role = user?.role || 'student';

  return (
    <nav className={`navbar-modern ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to={role === 'admin' ? '/admin' : '/student'} className="navbar-brand" onClick={closeMenu}>
          <div className="brand-logo">
            <FiZap className="brand-icon" />
          </div>
          <span className="brand-text">Event<span className="brand-highlight">Flow</span></span>
        </Link>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`navbar-links-wrapper ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-links">
            {role === 'admin' ? (
              <>
                <Link to="/admin" className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`} onClick={closeMenu}>
                  <FiLayout className="nav-icon" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/admin/create" className={`nav-item ${location.pathname === '/admin/create' ? 'active' : ''}`} onClick={closeMenu}>
                  <FiPlusSquare className="nav-icon" />
                  <span>Create Event</span>
                </Link>
                <Link to="/admin/attendance" className={`nav-item ${location.pathname === '/admin/attendance' ? 'active' : ''}`} onClick={closeMenu}>
                  <FiUser className="nav-icon" />
                  <span>Scan QR</span>
                </Link>
              </>
            ) : (
              <Link to="/student" className={`nav-item ${location.pathname === '/student' ? 'active' : ''}`} onClick={closeMenu}>
                <FiCalendar className="nav-icon" />
                <span>Explore Events</span>
              </Link>
            )}
          </div>

          <div className="nav-actions">
            {user && (
              <div className="user-info-badge">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <span className={`user-role-tag ${role}`}>
                    {role.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            
            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </button>
            
            <button onClick={handleLogout} className="nav-btn-logout" id="logout-btn">
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
