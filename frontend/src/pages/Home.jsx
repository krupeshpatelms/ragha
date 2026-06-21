import React from 'react';
import { Link } from 'react-router-dom';
import { foodItems, fallbackImage } from '../data/foodData';

const Home = () => {
  // Get a few popular items for the home page
  const featuredFoods = foodItems.slice(0, 4);

  return (
    <div className="home-container">
      <header className="hero">
        <div className="hero-content">
          <h1>Craving Something <span className="highlight">Delicious?</span></h1>
          <p>Get the best food from top restaurants delivered fast and fresh to your doorstep.</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn-primary">Explore Menu</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" alt="Delicious Food" />
        </div>
      </header>

      <section className="featured-section">
        <div className="section-header">
          <h2>Top Picks For You</h2>
          <Link to="/menu" className="view-all-link">View All →</Link>
        </div>
        <div className="food-grid">
          {featuredFoods.map(food => (
            <div key={food.id} className="food-card">
              <div className="food-img-wrapper">
                <img 
                  src={food.image} 
                  alt={food.name} 
                  onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                />
                <span className="category-badge">{food.category}</span>
              </div>
              <div className="food-info">
                <h3>{food.name}</h3>
                <p>{food.desc}</p>
                <div className="food-bottom">
                  <span className="price">${food.price.toFixed(2)}</span>
                  <Link to="/menu" className="btn-add">Order Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="features-banner">
        <div className="feature">
          <div className="feature-icon">🚀</div>
          <h3>Fast Delivery</h3>
          <p>Hot food within 30 mins</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🛡️</div>
          <h3>Safe & Hygienic</h3>
          <p>Top quality standards</p>
        </div>
        <div className="feature">
          <div className="feature-icon">⭐</div>
          <h3>Best Ratings</h3>
          <p>Loved by thousands</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
