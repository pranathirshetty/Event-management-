import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCalendar, FiLogOut, FiLayout, FiPlusSquare, FiUser, FiZap, FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ role, onRoleSwitch }) => {
  const location = useLocation();
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

  return (
    <nav className={`navbar-modern ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-logo">
            <FiZap className="brand-icon" />
          </div>
          <span className="brand-text">Campus<span className="brand-highlight">Events</span></span>
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
              </>
            ) : (
              <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
                <FiCalendar className="nav-icon" />
                <span>Explore Events</span>
              </Link>
            )}
          </div>

          <div className="nav-actions">
            <div className="role-switch-modern">
              <span className="role-badge">
                <FiUser className="role-icon" /> {role.toUpperCase()}
              </span>
              <button 
                onClick={() => {
                  onRoleSwitch(role === 'student' ? 'admin' : 'student');
                  closeMenu();
                }} 
                className="switch-btn-modern"
              >
                Switch to {role === 'student' ? 'Admin' : 'Student'}
              </button>
            </div>
            
            <Link to="/login" className="nav-btn-login" onClick={closeMenu}>
              <FiLogOut />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
