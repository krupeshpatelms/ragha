import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

import axios from 'axios';

const Checkout = ({ cartItems, clearCart, user }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Please login to place an order.");
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    
    // Calculate total amount
    const itemsTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const taxes = itemsTotal * 0.05;
    const finalTotal = itemsTotal + deliveryFee + taxes;

    try {
      const orderPayload = {
        user: { id: user.id },
        totalAmount: finalTotal,
        items: cartItems.map(item => ({
          food: { id: item.id },
          quantity: item.quantity,
          price: item.price
        }))
      };
      
      await axios.post('http://localhost:8081/api/orders', orderPayload);
      
      setSuccess(true);
      clearCart();
      setTimeout(() => {
        navigate('/user-dashboard');
      }, 3000);
    } catch (err) {
      console.error("Order failed", err);
      setError("Failed to place order. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="checkout-success">
        <h2>🎉 Order Placed Successfully!</h2>
        <p>Your delicious food is on the way.</p>
        <p>Redirecting to home...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Checkout</h2>
        <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>No items to checkout.</p>
        <button onClick={() => navigate('/menu')} className="btn-primary">Go to Menu</button>
      </div>
    );
  }

  // Calculate totals
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemsTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const taxes = itemsTotal * 0.05; // 5% tax
  const finalTotal = itemsTotal + deliveryFee + taxes;

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h2>Secure Checkout</h2>
      </div>
      {error && <div className="error-message" style={{textAlign: 'center', marginBottom: '1rem', color: 'red'}}>{error}</div>}

      <div className="checkout-layout">
        {/* Delivery Details Form */}
        <div className="checkout-form-container">
          <h3>Delivery Details</h3>
          <form id="checkout-form" onSubmit={handleCheckout}>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              
              <div className="form-group full-width">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>

              <div className="form-group full-width">
                <label>Street Address</label>
                <input type="text" placeholder="123 Foodie Lane" required />
              </div>

              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="New York" required />
              </div>

              <div className="form-group">
                <label>State</label>
                <input type="text" placeholder="NY" required />
              </div>

              <div className="form-group">
                <label>ZIP Code</label>
                <input type="text" placeholder="10001" required />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="(555) 123-4567" required />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-details">
            <div className="summary-line">
              <span>Items ({totalItemsCount})</span>
              <span>${itemsTotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Taxes (5%)</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
          
          <button form="checkout-form" type="submit" className="btn-place-order">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
