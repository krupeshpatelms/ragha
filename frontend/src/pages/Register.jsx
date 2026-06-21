import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:8081/api/register', {
        name,
        email,
        password,
        role
      });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setIsDropdownOpen(false);
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-box glass-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Join FoodieExpress</h2>
        {error && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="error-message">{error}</motion.div>}
        {success && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="success-message">{success}</motion.div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label>Role</label>
            <p style={{fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '8px'}}>Choose how you want to use FoodieExpress</p>
            <div className="role-dropdown-container" ref={dropdownRef}>
              <div 
                className={`role-dropdown-header ${isDropdownOpen ? 'open' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>
                  <span className="role-icon">{role === 'USER' ? '👤' : '🏪'}</span>
                  {role === 'USER' ? 'Customer (Order Food)' : 'Restaurant Owner (Manage)'}
                </span>
                <span>▼</span>
              </div>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    className="role-dropdown-list"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div 
                      className={`role-dropdown-item ${role === 'USER' ? 'selected' : ''}`}
                      onClick={() => handleRoleSelect('USER')}
                    >
                      <span className="role-icon">👤</span>
                      <div>
                        <strong>Customer</strong>
                        <div style={{fontSize: '0.8rem', color: 'var(--text-light)'}}>Order food from restaurants</div>
                      </div>
                    </div>
                    <div 
                      className={`role-dropdown-item ${role === 'OWNER' ? 'selected' : ''}`}
                      onClick={() => handleRoleSelect('OWNER')}
                    >
                      <span className="role-icon">🏪</span>
                      <div>
                        <strong>Restaurant Owner</strong>
                        <div style={{fontSize: '0.8rem', color: 'var(--text-light)'}}>Manage menu and orders</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="btn-primary block-btn" 
            style={{marginTop: '1.5rem'}}
          >
            Register
          </motion.button>
        </form>
        <p className="auth-link" style={{marginTop: '1.5rem', textAlign: 'center'}}>
          Already have an account? <Link to="/login" style={{color: 'var(--primary)', fontWeight: 'bold'}}>Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
