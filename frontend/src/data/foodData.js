export const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';

export const foodCategories = [
  "All",
  "North Indian",
  "South Indian",
  "Western",
  "Chinese",
  "Desserts",
  "Beverages"
];

export const foodItems = [
  // North Indian
  { id: 1, name: 'Butter Chicken', category: 'North Indian', price: 14.99, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', desc: 'Creamy and rich tomato-based chicken curry.' },
  { id: 2, name: 'Paneer Butter Masala', category: 'North Indian', price: 12.99, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', desc: 'Cottage cheese cubes in a thick spiced gravy.' },
  { id: 3, name: 'Naan', category: 'North Indian', price: 2.99, image: 'https://images.unsplash.com/photo-1505253713664-d621b19fb1d2?auto=format&fit=crop&w=600&q=80', desc: 'Soft and fluffy Indian flatbread baked in a tandoor.' },
  { id: 4, name: 'Biryani', category: 'North Indian', price: 13.50, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', desc: 'Aromatic rice dish cooked with spices and meat.' },

  // South Indian
  { id: 5, name: 'Masala Dosa', category: 'South Indian', price: 8.99, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80', desc: 'Crispy rice crepe filled with spiced potato mash.' },
  { id: 6, name: 'Idli Sambhar', category: 'South Indian', price: 6.99, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=600&q=80', desc: 'Steamed rice and lentil cakes served with chutney.' },
  { id: 7, name: 'Medu Vada', category: 'South Indian', price: 5.99, image: 'https://images.unsplash.com/photo-1626082895617-2c6bfdd5b40c?auto=format&fit=crop&w=600&q=80', desc: 'Deep-fried savory doughnut made from lentils.' },
  { id: 8, name: 'Ven Pongal', category: 'South Indian', price: 7.50, image: 'https://images.unsplash.com/photo-1626082929543-6905540fc722?auto=format&fit=crop&w=600&q=80', desc: 'Comforting dish of rice and lentils cooked with ghee.' },

  // Western
  { id: 9, name: 'Classic Burger', category: 'Western', price: 9.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', desc: 'Juicy beef patty with cheese, lettuce, and tomato.' },
  { id: 10, name: 'Margherita Pizza', category: 'Western', price: 12.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80', desc: 'Classic cheese and tomato margherita.' },
  { id: 11, name: 'Pasta Carbonara', category: 'Western', price: 11.50, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80', desc: 'Creamy carbonara with bacon and parmesan.' },
  { id: 12, name: 'French Fries', category: 'Western', price: 4.50, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80', desc: 'Crispy golden fries served with ketchup.' },

  // Chinese
  { id: 13, name: 'Hakka Noodles', category: 'Chinese', price: 10.99, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', desc: 'Stir-fried noodles with vegetables and soy sauce.' },
  { id: 14, name: 'Veg Fried Rice', category: 'Chinese', price: 10.50, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80', desc: 'Wok-tossed rice with vegetables and egg.' },
  { id: 15, name: 'Gobi Manchurian', category: 'Chinese', price: 11.99, image: 'https://images.unsplash.com/photo-1626804475297-41609ea0ebb3?auto=format&fit=crop&w=600&q=80', desc: 'Vegetable dumplings in a spicy, tangy sauce.' },
  { id: 16, name: 'Veg Momos', category: 'Chinese', price: 8.50, image: 'https://images.unsplash.com/photo-1626779848149-6ee124316d94?auto=format&fit=crop&w=600&q=80', desc: 'Steamed dumplings filled with seasoned vegetables.' },

  // Desserts
  { id: 17, name: 'Vanilla Ice Cream', category: 'Desserts', price: 4.99, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80', desc: 'Vanilla and chocolate scoops with chocolate syrup.' },
  { id: 18, name: 'Gulab Jamun', category: 'Desserts', price: 5.50, image: 'https://images.unsplash.com/photo-1596803244618-8dbee441d70b?auto=format&fit=crop&w=600&q=80', desc: 'Deep-fried milk solids soaked in sugar syrup.' },
  { id: 19, name: 'Chocolate Brownie', category: 'Desserts', price: 6.00, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', desc: 'Rich, fudgy chocolate brownie served warm.' },
  { id: 20, name: 'Chocolate Cake', category: 'Desserts', price: 7.50, image: 'https://images.unsplash.com/photo-1578985545062-69928b1ea345?auto=format&fit=crop&w=600&q=80', desc: 'Slice of moist chocolate cake with buttercream frosting.' },

  // Beverages
  { id: 21, name: 'Coca Cola', category: 'Beverages', price: 2.50, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80', desc: 'Chilled carbonated cola drink.' },
  { id: 22, name: 'Mango Juice', category: 'Beverages', price: 3.99, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80', desc: 'Freshly squeezed sweet mango juice.' },
  { id: 23, name: 'Black Coffee', category: 'Beverages', price: 4.50, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80', desc: 'Hot brewed arabica coffee.' },
  { id: 24, name: 'Chocolate Milkshake', category: 'Beverages', price: 5.50, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80', desc: 'Thick and creamy chocolate milkshake.' }
];
