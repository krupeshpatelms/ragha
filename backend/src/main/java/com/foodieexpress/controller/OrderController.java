package com.foodieexpress.controller;

import com.foodieexpress.model.Order;
import com.foodieexpress.model.OrderItem;
import com.foodieexpress.model.User;
import com.foodieexpress.repository.OrderRepository;
import com.foodieexpress.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import java.util.Random;
import org.springframework.lang.NonNull;

import com.foodieexpress.model.Food;
import com.foodieexpress.repository.FoodRepository;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    private static final String[] DELIVERY_BOYS = {"John Doe", "Mike Smith", "Rajesh Kumar", "David Wilson", "Ali Khan"};

    // User: Place an order
    @SuppressWarnings("null")
    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody Order orderRequest) {
        if (orderRequest.getUser() == null || orderRequest.getUser().getId() == null) {
            return ResponseEntity.badRequest().body("User ID is required");
        }

        Long userId = orderRequest.getUser().getId();
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        orderRequest.setUser(userOptional.get());
        
        // Link order items to this order
        if (orderRequest.getItems() != null) {
            for (OrderItem item : orderRequest.getItems()) {
                item.setOrder(orderRequest);
                if (item.getFood() != null && item.getFood().getId() != null) {
                    Optional<Food> foodOpt = foodRepository.findById(item.getFood().getId());
                    if (foodOpt.isPresent()) {
                        item.setFood(foodOpt.get());
                    }
                }
            }
        }

        // Set dummy delivery details
        Random rand = new Random();
        orderRequest.setDeliveryBoyName(DELIVERY_BOYS[rand.nextInt(DELIVERY_BOYS.length)]);
        orderRequest.setDeliveryMessage("Your delivery is on the way!");
        // Estimated time between 30 to 45 mins
        int randomMins = 30 + rand.nextInt(16);
        orderRequest.setEstimatedDeliveryTime(java.time.LocalDateTime.now().plusMinutes(randomMins));

        Order savedOrder = orderRepository.save(orderRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    // Owner: Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // User: Get order history
    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable @NonNull Long userId) {
        return orderRepository.findByUserId(userId);
    }

    // Owner: Update order status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable @NonNull Long id, @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        if (newStatus == null) {
            return ResponseEntity.badRequest().body("Status is required");
        }

        Optional<Order> orderOptional = orderRepository.findById(id);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setStatus(newStatus);
            return ResponseEntity.ok(orderRepository.save(order));
        }
        return ResponseEntity.notFound().build();
    }
}
