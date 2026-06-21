package com.foodieexpress.service;

import com.foodieexpress.model.Food;
import com.foodieexpress.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class SmartFoodService {

    @Autowired
    private FoodRepository foodRepository;

    private static final Map<String, String[]> CATEGORY_RULES = new HashMap<>();

    static {
        CATEGORY_RULES.put("South Indian", new String[]{"dosa", "idli", "vada", "uttapam"});
        CATEGORY_RULES.put("Western", new String[]{"pizza", "burger", "pasta", "sandwich", "fries"});
        CATEGORY_RULES.put("North Indian", new String[]{"biryani", "roti", "curry", "naan", "paneer", "dal"});
        CATEGORY_RULES.put("Chinese", new String[]{"noodles", "fried rice", "manchurian", "momo", "chowmein"});
        CATEGORY_RULES.put("Drinks", new String[]{"coffee", "tea", "juice", "shake", "coke", "water", "lassi"});
        CATEGORY_RULES.put("Desserts", new String[]{"brownie", "cake", "ice cream", "sweet", "gulab jamun", "pastry"});
        CATEGORY_RULES.put("Snacks", new String[]{"samosa", "pakora", "chips", "chaat", "puri"});
    }

    private static final Map<String, String> FOOD_IMAGE_MAP = new HashMap<>();

    static {
        // vada pav / vadapav
        FOOD_IMAGE_MAP.put("vada pav", "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("vadapav", "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("vada-pav", "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80");
        
        // dosa
        FOOD_IMAGE_MAP.put("dosa", "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80");
        
        // idli
        FOOD_IMAGE_MAP.put("idli", "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80");
        
        // vada (Medu Vada)
        FOOD_IMAGE_MAP.put("vada", "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80");
        
        // paneer
        FOOD_IMAGE_MAP.put("paneer", "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80");
        
        // biryani
        FOOD_IMAGE_MAP.put("biryani", "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("pulao", "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80");
        
        // pizza
        FOOD_IMAGE_MAP.put("pizza", "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80");
        
        // burger
        FOOD_IMAGE_MAP.put("burger", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80");
        
        // fried rice
        FOOD_IMAGE_MAP.put("fried rice", "https://images.unsplash.com/photo-1603133872878-6c6f9802d646?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("friedrice", "https://images.unsplash.com/photo-1603133872878-6c6f9802d646?auto=format&fit=crop&w=600&q=80");
        
        // noodles
        FOOD_IMAGE_MAP.put("noodles", "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("chowmein", "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("noodle", "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80");
        
        // manchurian
        FOOD_IMAGE_MAP.put("manchurian", "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80");
        
        // brownie
        FOOD_IMAGE_MAP.put("brownie", "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80");
        
        // ice cream
        FOOD_IMAGE_MAP.put("ice cream", "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("icecream", "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80");
        
        // gulab jamun
        FOOD_IMAGE_MAP.put("gulab jamun", "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("gulabjamun", "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80");
        
        // tea / coffee / juice / drinks
        FOOD_IMAGE_MAP.put("tea", "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("chai", "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("coffee", "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("juice", "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("shake", "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("drink", "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("beverage", "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("lassi", "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80");
        
        // snacks
        FOOD_IMAGE_MAP.put("samosa", "https://images.unsplash.com/photo-1626082895617-2c6b45946950?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("pakora", "https://images.unsplash.com/photo-1626082895617-2c6b45946950?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("chips", "https://images.unsplash.com/photo-1626082895617-2c6b45946950?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("naan", "https://images.unsplash.com/photo-1601356616077-695728ecf769?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("pasta", "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80");
        FOOD_IMAGE_MAP.put("fries", "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80");
    }

    public Food addFoodWithSmartFeatures(Food food) {
        // 1. Automatic Category Detection
        if (food.getCategory() == null || food.getCategory().isEmpty() || food.getCategory().equals("Other")) {
            food.setCategory(detectCategory(food.getName()));
        }

        // 2. Automatic Food Image Fetching & 3. Fallback System
        if (food.getImageUrl() == null || food.getImageUrl().isEmpty() || isBadImageUrl(food.getImageUrl())) {
            food.setImageUrl(generateImageUrl(food.getName(), food.getCategory()));
        }

        return foodRepository.save(food);
    }

    private String detectCategory(String foodName) {
        String lowerName = foodName.toLowerCase();
        for (Map.Entry<String, String[]> entry : CATEGORY_RULES.entrySet()) {
            for (String keyword : entry.getValue()) {
                if (lowerName.contains(keyword)) {
                    return entry.getKey();
                }
            }
        }
        return "Other";
    }

    public String generateImageUrl(String foodName, String category) {
        String lowerName = foodName.toLowerCase().trim();
        String bestMatchUrl = null;
        int longestMatchLength = 0;
        
        for (Map.Entry<String, String> entry : FOOD_IMAGE_MAP.entrySet()) {
            if (lowerName.contains(entry.getKey())) {
                if (entry.getKey().length() > longestMatchLength) {
                    longestMatchLength = entry.getKey().length();
                    bestMatchUrl = entry.getValue();
                }
            }
        }
        
        if (bestMatchUrl != null) {
            return bestMatchUrl;
        }
        return getFallbackImage(category);
    }

    public boolean isBadImageUrl(String imageUrl) {
        return imageUrl == null || imageUrl.isEmpty() || imageUrl.contains("loremflickr.com") || imageUrl.contains("placehold.co");
    }

    private String getFallbackImage(String category) {
        return switch (category) {
            case "South Indian" -> "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80"; // dosa
            case "Western" -> "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"; // burger
            case "North Indian" -> "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80"; // curry/biryani
            case "Chinese" -> "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"; // noodles
            case "Drinks" -> "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80"; // beverage
            case "Desserts" -> "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80"; // dessert
            case "Snacks" -> "https://images.unsplash.com/photo-1626082895617-2c6b45946950?auto=format&fit=crop&w=600&q=80"; // samosa/snack
            default -> "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"; // general meal
        };
    }
}
