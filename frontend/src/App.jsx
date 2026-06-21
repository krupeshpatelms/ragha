import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import PriceFilter from './pages/PriceFilter';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OwnerDashboard from './pages/OwnerDashboard';
import UserDashboard from './pages/UserDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Persist cart to local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('foodieCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('foodieCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (food) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === food.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...food, quantity: 1 }];
    });
    alert(`${food.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="app-container">
        <Navbar cartCount={cartCount} user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="/price-filter" element={<PriceFilter addToCart={addToCart} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} user={user} />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard user={user} />} />
            <Route path="/user-dashboard" element={<UserDashboard user={user} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
