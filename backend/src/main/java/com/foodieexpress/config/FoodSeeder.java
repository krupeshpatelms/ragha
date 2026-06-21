package com.foodieexpress.config;

import com.foodieexpress.model.Food;
import com.foodieexpress.repository.FoodRepository;
import com.foodieexpress.service.SmartFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class FoodSeeder implements CommandLineRunner {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private SmartFoodService smartFoodService;

    @Override
    @SuppressWarnings("null")
    public void run(String... args) throws Exception {
        if (foodRepository.count() == 0) {
            System.out.println("Seeding default food items into SQLite Database...");

            List<Food> defaultFoods = Arrays.asList(
                // South Indian
                new Food("Masala Dosa", "South Indian", "Crispy crepe with potato filling", 7.99, "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"),
                new Food("Idli Sambar", "South Indian", "Steamed rice cakes with lentil soup", 5.99, "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"),
                new Food("Medu Vada", "South Indian", "Deep-fried lentil donuts", 4.99, "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80"),

                // North Indian
                new Food("Chicken Biryani", "North Indian", "Aromatic basmati rice with chicken", 12.99, "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"),
                new Food("Paneer Butter Masala", "North Indian", "Cottage cheese in rich tomato gravy", 10.99, "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80"),
                new Food("Garlic Naan", "North Indian", "Oven-baked flatbread with garlic", 2.99, "https://images.unsplash.com/photo-1601356616077-695728ecf769?auto=format&fit=crop&w=600&q=80"),

                // Chinese
                new Food("Veg Hakka Noodles", "Chinese", "Stir-fried noodles with vegetables", 8.99, "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"),
                new Food("Chicken Manchurian", "Chinese", "Spicy Indo-Chinese chicken dish", 9.99, "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"),
                new Food("Veg Fried Rice", "Chinese", "Wok-tossed rice with mixed vegetables", 7.99, "https://images.unsplash.com/photo-1603133872878-6c6f9802d646?auto=format&fit=crop&w=600&q=80"),

                // Western
                new Food("Margherita Pizza", "Western", "Classic cheese and tomato pizza", 14.99, "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"),
                new Food("Cheeseburger", "Western", "Beef patty with cheese and lettuce", 9.99, "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"),
                new Food("Alfredo Pasta", "Western", "Creamy cheese sauce with fettuccine", 11.99, "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80"),

                // Snacks
                new Food("Punjabi Samosa", "Snacks", "Crispy pastry with spiced potato", 3.99, "https://images.unsplash.com/photo-1626082895617-2c6b45946950?auto=format&fit=crop&w=600&q=80"),
                new Food("French Fries", "Snacks", "Golden crispy potato sticks", 4.99, "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"),
                new Food("Pani Puri", "Snacks", "Crispy shells with tangy water", 5.99, "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"),

                // Drinks
                new Food("Mango Lassi", "Drinks", "Sweet yogurt drink with mango", 4.50, "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80"),
                new Food("Cold Coffee", "Drinks", "Chilled coffee with milk and ice", 3.99, "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80"),
                new Food("Masala Chai", "Drinks", "Spiced Indian tea", 2.50, "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"),

                // Desserts
                new Food("Chocolate Brownie", "Desserts", "Fudgy brownie with chocolate chunks", 6.99, "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"),
                new Food("Gulab Jamun", "Desserts", "Sweet milk solids in syrup", 4.99, "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80"),
                new Food("Vanilla Ice Cream", "Desserts", "Classic vanilla scoop", 3.99, "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80")
            );

            foodRepository.saveAll(defaultFoods);
            System.out.println("Default foods seeded successfully!");
        } else {
            System.out.println("Checking and updating existing food images in SQLite Database...");
            List<Food> foods = foodRepository.findAll();
            boolean updated = false;
            for (Food food : foods) {
                if (smartFoodService.isBadImageUrl(food.getImageUrl())) {
                    food.setImageUrl(smartFoodService.generateImageUrl(food.getName(), food.getCategory()));
                    foodRepository.save(food);
                    updated = true;
                }
            }
            if (updated) {
                System.out.println("Existing food images updated successfully!");
            } else {
                System.out.println("All food images are already up-to-date.");
            }
        }
    }
}
