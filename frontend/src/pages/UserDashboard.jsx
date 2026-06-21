import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FOOD_IMAGE_MAP = {
  "vada pav": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80",
  "vadapav": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80",
  "vada-pav": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80",
  "dosa": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80",
  "idli": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
  "vada": "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80",
  "paneer": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
  "biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  "pulao": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
  "pizza": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  "burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  "fried rice": "https://images.unsplash.com/photo-1603133872878-6c6f9802d646?auto=format&fit=crop&w=600&q=80",
  "friedrice": "https://images.unsplash.com/photo-1603133872878-6c6f9802d646?auto=format&fit=crop&w=600&q=80",
  "noodles": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
  "noodle": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
  "chowmein": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80",
  "manchurian": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80",
  "samosa": "https://images.unsplash.com/photo-1626082895617-2c6b45946950?auto=format&fit=crop&w=600&q=80",
  "brownie": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
  "ice cream": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80",
  "icecream": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80",
  "gulab jamun": "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
  "gulabjamun": "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
  "tea": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
  "chai": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
  "coffee": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
  "juice": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80",
  "shake": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80",
  "lassi": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80",
  "naan": "https://images.unsplash.com/photo-1601356616077-695728ecf769?auto=format&fit=crop&w=600&q=80",
  "pasta": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80",
  "fries": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
};

const getFrontendFoodImage = (food) => {
  if (food.imageUrl && !food.imageUrl.includes('loremflickr.com') && !food.imageUrl.includes('placehold.co')) {
    return food.imageUrl;
  }
  
  const lowerName = food.name.toLowerCase().trim();
  let bestMatchUrl = null;
  let longestMatchLength = 0;
  
  for (const [key, value] of Object.entries(FOOD_IMAGE_MAP)) {
    if (lowerName.includes(key)) {
      if (key.length > longestMatchLength) {
        longestMatchLength = key.length;
        bestMatchUrl = value;
      }
    }
  }
  
  if (bestMatchUrl) {
    return bestMatchUrl;
  }
  
  switch(food.category) {
    case "South Indian": return "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80";
    case "Western": return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80";
    case "North Indian": return "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80";
    case "Chinese": return "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80";
    case "Drinks": return "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80";
    case "Desserts": return "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80";
    case "Snacks": return "https://images.unsplash.com/photo-1626082895617-2c6b45946950?auto=format&fit=crop&w=600&q=80";
    default: return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80";
  }
};

const UserDashboard = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchMyOrders();
  }, [user, navigate]);

  const fetchMyOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/orders/user/${user.id}`);
      // Sort orders newest first
      const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching my orders", err);
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case 'PENDING': return 25;
      case 'PREPARING': return 50;
      case 'OUT_FOR_DELIVERY': return 75;
      case 'DELIVERED': return 100;
      default: return 0;
    }
  };

  return (
    <div className="user-dashboard-container">
      <div className="user-dash-header">
        <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
        <div>
          <h2>My Profile & Orders</h2>
          <p>Welcome back, {user?.name}! Here is your order history.</p>
        </div>
      </div>
      
      <div className="user-orders-list">
        <h3>My Orders</h3>
        {orders.length === 0 ? (
          <div className="no-orders-card">
            <p>You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/menu')} className="btn-primary">Browse Menu</button>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="user-order-card">
              <div className="order-card-header">
                <div>
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-date">{new Date(order.orderDate).toLocaleString()}</span>
                </div>
                <div className="order-total">
                  Total: <strong>${order.totalAmount.toFixed(2)}</strong>
                </div>
              </div>
              
              <div className="order-card-body">
                <div className="order-items-section">
                  <h4>Items Ordered</h4>
                  {order.items?.map(item => (
                    <div key={item.id} className="user-ordered-item">
                      <img src={getFrontendFoodImage(item.food)} alt={item.food.name} className="item-mini-img" />
                      <div className="item-details">
                        <span className="item-name">{item.food.name}</span>
                        <span className="item-qty">Qty: {item.quantity}</span>
                      </div>
                      <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-delivery-section">
                  <h4>Delivery Details</h4>
                  <div className="delivery-info-box">
                    <p><strong>Status:</strong> <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></p>
                    {order.deliveryBoyName && (
                      <p><strong>Delivery Partner:</strong> 🛵 {order.deliveryBoyName}</p>
                    )}
                    {order.estimatedDeliveryTime && order.status !== 'DELIVERED' && (
                      <p><strong>Estimated Arrival:</strong> ⏳ {new Date(order.estimatedDeliveryTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    )}
                    {order.deliveryMessage && order.status !== 'DELIVERED' && (
                      <div className="delivery-msg">
                        💬 <em>"{order.deliveryMessage}"</em>
                      </div>
                    )}
                  </div>
                  
                  {/* Status Tracker Bar */}
                  <div className="status-tracker">
                    <div className="tracker-bar">
                      <div className="tracker-fill" style={{ width: `${getStatusProgress(order.status)}%` }}></div>
                    </div>
                    <div className="tracker-labels">
                      <span>Pending</span>
                      <span>Preparing</span>
                      <span>On the Way</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
