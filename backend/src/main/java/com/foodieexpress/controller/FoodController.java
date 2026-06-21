package com.foodieexpress.controller;

import com.foodieexpress.model.Food;
import com.foodieexpress.repository.FoodRepository;
import com.foodieexpress.service.SmartFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private SmartFoodService smartFoodService;

    private List<Food> sanitizeFoodImages(List<Food> foods) {
        for (Food food : foods) {
            if (smartFoodService.isBadImageUrl(food.getImageUrl())) {
                food.setImageUrl(smartFoodService.generateImageUrl(food.getName(), food.getCategory()));
                foodRepository.save(food);
            }
        }
        return foods;
    }

    // Public: Get all foods
    @GetMapping
    public List<Food> getAllFoods() {
        return sanitizeFoodImages(foodRepository.findAll());
    }

    // Public: Get foods by category
    @GetMapping("/category/{category}")
    public List<Food> getFoodsByCategory(@PathVariable String category) {
        return sanitizeFoodImages(foodRepository.findByCategory(category));
    }

    // Public: Search foods
    @GetMapping("/search")
    public List<Food> searchFoods(@RequestParam String q) {
        return sanitizeFoodImages(foodRepository.findByNameContainingIgnoreCase(q));
    }

    // Owner: Add new food
    @PostMapping
    public ResponseEntity<Food> addFood(@RequestBody Food food) {
        Food savedFood = smartFoodService.addFoodWithSmartFeatures(food);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFood);
    }

    // Owner: Update food
    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable @NonNull Long id, @RequestBody Food foodDetails) {
        Optional<Food> foodOptional = foodRepository.findById(id);
        if (foodOptional.isPresent()) {
            Food food = foodOptional.get();
            food.setName(foodDetails.getName());
            food.setDescription(foodDetails.getDescription());
            food.setPrice(foodDetails.getPrice());
            // Optionally update category/image if user provides, else keep existing
            if (foodDetails.getCategory() != null && !foodDetails.getCategory().isEmpty()) {
                food.setCategory(foodDetails.getCategory());
            }
            if (foodDetails.getImageUrl() != null && !foodDetails.getImageUrl().isEmpty()) {
                food.setImageUrl(foodDetails.getImageUrl());
            }
            return ResponseEntity.ok(foodRepository.save(food));
        }
        return ResponseEntity.notFound().build();
    }

    // Owner: Delete food
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable @NonNull Long id) {
        if (foodRepository.existsById(id)) {
            foodRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
