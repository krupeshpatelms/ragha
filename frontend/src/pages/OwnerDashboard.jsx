import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#FF416C', '#4facfe', '#11998e', '#f5af19', '#667eea', '#ff7675', '#a29bfe'];

const OwnerDashboard = ({ user }) => {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [sales, setSales] = useState({ topSelling: [], leastSelling: [], categorySales: [] });
  const [newFood, setNewFood] = useState({ name: '', description: '', price: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'OWNER') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const [foodsRes, ordersRes, statsRes, salesRes] = await Promise.all([
        axios.get('http://localhost:8081/api/foods'),
        axios.get('http://localhost:8081/api/orders'),
        axios.get('http://localhost:8081/api/dashboard/stats'),
        axios.get('http://localhost:8081/api/dashboard/food-sales')
      ]);
      setFoods(foodsRes.data);
      setOrders(ordersRes.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
      setStats(statsRes.data);
      setSales(salesRes.data);
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/foods', newFood);
      alert('Food added successfully! AI will generate category and image.');
      setNewFood({ name: '', description: '', price: '' });
      fetchData();
    } catch (err) {
      console.error("Error adding food", err);
      alert('Failed to add food');
    }
  };

  const handleDeleteFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      try {
        await axios.delete(`http://localhost:8081/api/foods/${id}`);
        fetchData();
      } catch (err) {
        console.error("Error deleting food", err);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8081/api/orders/${orderId}/status`, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error("Error updating order status", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div className="owner-dashboard" initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div className="owner-header" variants={itemVariants}>
        <h2>Restaurant Management Dashboard</h2>
        <p>Welcome, {user?.name} | Role: Administrator</p>
      </motion.div>
      
      {stats && (
        <motion.div id="analytics-section" className="stats-grid" variants={itemVariants}>
          <div className="stat-card revenue">
            <h4>Total Revenue</h4>
            <h2>${stats.totalRevenue.toFixed(2)}</h2>
          </div>
          <div className="stat-card orders">
            <h4>Total Orders</h4>
            <h2>{stats.totalOrders}</h2>
          </div>
          <div className="stat-card pending">
            <h4>Pending/Preparing</h4>
            <h2>{stats.pendingOrders + stats.preparingOrders}</h2>
          </div>
          <div className="stat-card delivered">
            <h4>Delivered</h4>
            <h2>{stats.deliveredOrders}</h2>
          </div>
          <div className="stat-card foods">
            <h4>Total Food Items</h4>
            <h2>{stats.totalFoods || foods.length}</h2>
          </div>
        </motion.div>
      )}

      {stats && stats.revenueTrend && (
        <motion.div className="dashboard-row" variants={itemVariants}>
          <div className="dashboard-panel">
            <h3>Revenue Trend 💰</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <LineChart data={stats.revenueTrend}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Line type="monotone" dataKey="revenue" stroke="#FF416C" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="dashboard-panel">
            <h3>Category-wise Sales 🍕</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={sales.categorySales} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {sales.categorySales?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div className="dashboard-row" variants={itemVariants}>
        <div className="dashboard-panel">
          <h3>Top Selling Foods 📈</h3>
          <table className="owner-table">
            <thead>
              <tr><th>Food</th><th>Qty Sold</th><th>Revenue</th><th>Orders</th></tr>
            </thead>
            <tbody>
              {sales.topSelling?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.food.name}</td>
                  <td><strong>{item.totalSold}</strong> units</td>
                  <td>${item.revenue?.toFixed(2)}</td>
                  <td>{item.orderCount}</td>
                </tr>
              ))}
              {(!sales.topSelling || sales.topSelling.length === 0) && <tr><td colSpan="4">No sales yet</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="dashboard-panel">
          <h3>Least Selling Foods 📉</h3>
          <table className="owner-table">
            <thead>
              <tr><th>Food</th><th>Qty Sold</th><th>Revenue</th><th>Action</th></tr>
            </thead>
            <tbody>
              {sales.leastSelling?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.food.name}</td>
                  <td><strong>{item.totalSold}</strong> units</td>
                  <td>${item.revenue?.toFixed(2)}</td>
                  <td><button onClick={() => handleDeleteFood(item.food.id)} className="btn-remove-sm">Remove</button></td>
                </tr>
              ))}
              {(!sales.leastSelling || sales.leastSelling.length === 0) && <tr><td colSpan="4">No sales yet</td></tr>}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div id="add-food" className="dashboard-panel" variants={itemVariants}>
        <h3>Add New Food Variety</h3>
        <form onSubmit={handleAddFood} className="owner-add-form">
          <input type="text" placeholder="Food Name (e.g., Paneer Tikka)" value={newFood.name} onChange={e => setNewFood({...newFood, name: e.target.value})} required className="filter-input" />
          <input type="text" placeholder="Description" value={newFood.description} onChange={e => setNewFood({...newFood, description: e.target.value})} className="filter-input" />
          <input type="number" placeholder="Price ($)" value={newFood.price} onChange={e => setNewFood({...newFood, price: e.target.value})} required className="filter-input" />
          <button type="submit" className="btn-primary">Add Food</button>
        </form>
        <p className="ai-hint">✨ System will automatically detect category and fetch a high-quality image from Unsplash.</p>
      </motion.div>

      <motion.div id="orders-table" className="dashboard-panel full-width" variants={itemVariants}>
        <h3>Recent Orders Processing</h3>
        <table className="owner-table">
          <thead>
            <tr>
              <th>Order Time</th>
              <th>Customer</th>
              <th>Items Ordered</th>
              <th>Amount</th>
              <th>Est. Delivery</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <motion.tr key={order.id} initial={{opacity:0}} animate={{opacity:1}}>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.user?.name}</td>
                <td>
                  <ul className="ordered-items-list" style={{paddingLeft: '1rem', margin: 0}}>
                    {order.items?.map(item => (
                      <li key={item.id}>{item.quantity}x {item.food.name}</li>
                    ))}
                  </ul>
                </td>
                <td><strong>${order.totalAmount.toFixed(2)}</strong></td>
                <td>{order.estimatedDeliveryTime ? new Date(order.estimatedDeliveryTime).toLocaleTimeString() : 'Pending'}</td>
                <td><span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                <td>
                  <select className="status-select" value={order.status} onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}>
                    <option value="PENDING">Pending</option>
                    <option value="PREPARING">Preparing</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                  </select>
                </td>
              </motion.tr>
            ))}
            {orders.length === 0 && <tr><td colSpan="7" style={{textAlign:'center', padding: '2rem'}}>No orders found.</td></tr>}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default OwnerDashboard;
