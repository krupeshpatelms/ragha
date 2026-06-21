import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount, user, setUser }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          🍕 FoodieExpress
        </Link>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          
          {(!user || user.role !== 'OWNER') && (
            <>
              <Link to="/" onClick={closeMenu}>Home</Link>
              <Link to="/menu" onClick={closeMenu}>Menu</Link>
              <Link to="/price-filter" onClick={closeMenu}>Price Filter</Link>
              <Link to="/cart" onClick={closeMenu} className="cart-link">
                Cart <span className="cart-badge">{cartCount}</span>
              </Link>
            </>
          )}

          {user && user.role === 'OWNER' && (
            <>
              <Link to="/owner-dashboard" onClick={closeMenu}>Owner Dashboard</Link>
              <a href="#add-food" onClick={closeMenu}>Add Food</a>
              <a href="#orders-table" onClick={closeMenu}>Orders</a>
              <a href="#analytics-section" onClick={closeMenu}>Analytics</a>
            </>
          )}
          
          {user ? (
            <div className="user-section">
              <span className="user-greeting">Hi, {user.name}</span>
              {user.role === 'USER' && (
                <Link to="/user-dashboard" onClick={closeMenu} className="btn-dashboard">My Orders</Link>
              )}
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" onClick={closeMenu} className="btn-login-nav">Login</Link>
              <Link to="/register" onClick={closeMenu} className="btn-register-nav">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
