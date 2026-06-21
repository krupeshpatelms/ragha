import React, { useState, useEffect } from 'react';
import axios from 'axios';

const foodCategories = ['All', 'South Indian', 'North Indian', 'Chinese', 'Western', 'Snacks', 'Drinks', 'Desserts'];
const fallbackImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80';

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

const Menu = ({ addToCart }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('None');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/foods');
        setFoods(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching foods", error);
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  let filteredFoods = [...foods].filter(food => {
    const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortOrder === 'Low to High') {
    filteredFoods.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'High to Low') {
    filteredFoods.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>Our Menu</h2>
        <div className="search-bar" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search food items..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          >
            <option value="None">Sort: Recommended</option>
            <option value="Low to High">Price: Low to High</option>
            <option value="High to Low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="category-filters">
        {foodCategories.map(category => (
          <button 
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>Loading fresh food menu...</h3>
        </div>
      ) : (
        <div className="food-grid">
          {filteredFoods.length > 0 ? (
            filteredFoods.map(food => (
              <div key={food.id} className="food-card">
                <div className="food-img-wrapper">
                  <img 
                    src={getFrontendFoodImage(food)} 
                    alt={food.name} 
                    onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                  />
                  <span className="category-badge">{food.category}</span>
                </div>
                <div className="food-info">
                  <h3>{food.name}</h3>
                  <p>{food.description}</p>
                  <div className="food-bottom">
                    <span className="price">${food.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(food)} className="btn-add">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
              <p>No food items found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
