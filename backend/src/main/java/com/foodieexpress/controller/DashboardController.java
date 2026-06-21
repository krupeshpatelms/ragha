package com.foodieexpress.controller;

import com.foodieexpress.model.Order;
import com.foodieexpress.model.Food;
import com.foodieexpress.repository.FoodRepository;
import com.foodieexpress.repository.OrderItemRepository;
import com.foodieexpress.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private FoodRepository foodRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        List<Order> orders = orderRepository.findAll();
        double totalRevenue = 0;
        int pending = 0;
        int preparing = 0;
        int delivered = 0;

        Map<String, Double> revenueTrend = new TreeMap<>();
        Map<String, Integer> ordersPerDay = new TreeMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd");

        for (Order order : orders) {
            totalRevenue += order.getTotalAmount();
            switch (order.getStatus()) {
                case "PENDING":
                    pending++;
                    break;
                case "PREPARING":
                    preparing++;
                    break;
                case "DELIVERED":
                    delivered++;
                    break;
            }
            if (order.getOrderDate() != null) {
                String dateStr = order.getOrderDate().format(formatter);
                revenueTrend.put(dateStr, revenueTrend.getOrDefault(dateStr, 0.0) + order.getTotalAmount());
                ordersPerDay.put(dateStr, ordersPerDay.getOrDefault(dateStr, 0) + 1);
            }
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrders", orders.size());
        stats.put("totalRevenue", totalRevenue);
        stats.put("pendingOrders", pending);
        stats.put("preparingOrders", preparing);
        stats.put("deliveredOrders", delivered);
        stats.put("totalFoods", foodRepository.count());

        List<Map<String, Object>> revenueTrendList = new ArrayList<>();
        for (Map.Entry<String, Double> entry : revenueTrend.entrySet()) {
            revenueTrendList.add(Map.of("date", entry.getKey(), "revenue", entry.getValue()));
        }
        
        List<Map<String, Object>> ordersTrendList = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : ordersPerDay.entrySet()) {
            ordersTrendList.add(Map.of("date", entry.getKey(), "orders", entry.getValue()));
        }

        stats.put("revenueTrend", revenueTrendList);
        stats.put("ordersTrend", ordersTrendList);

        return stats;
    }

    @GetMapping("/food-sales")
    public Map<String, Object> getFoodSales() {
        List<Object[]> sales = orderItemRepository.getFoodSales();
        
        List<Map<String, Object>> allSales = new ArrayList<>();
        Map<String, Double> categorySales = new HashMap<>();

        for (Object[] sale : sales) {
            Food food = (Food) sale[0];
            Number totalSold = (Number) sale[1];
            Number revenue = (Number) sale[2];
            Number orderCount = (Number) sale[3];

            Map<String, Object> item = new HashMap<>();
            item.put("food", food);
            item.put("totalSold", totalSold != null ? totalSold.intValue() : 0);
            item.put("revenue", revenue != null ? revenue.doubleValue() : 0.0);
            item.put("orderCount", orderCount != null ? orderCount.intValue() : 0);
            allSales.add(item);

            String cat = food.getCategory() != null ? food.getCategory() : "Other";
            categorySales.put(cat, categorySales.getOrDefault(cat, 0.0) + (revenue != null ? revenue.doubleValue() : 0.0));
        }
        
        List<Map<String, Object>> topSelling = new ArrayList<>();
        List<Map<String, Object>> leastSelling = new ArrayList<>();

        int n = Math.min(3, allSales.size());
        for (int i = 0; i < n; i++) {
            topSelling.add(allSales.get(i));
        }

        // To avoid duplication if size is very small, we only add to leastSelling if it wasn't added to topSelling.
        // Actually, if there are exactly 3 items, they are top selling. The least selling might be empty.
        // If > 3, last few are least.
        for (int i = Math.max(n, allSales.size() - n); i < allSales.size(); i++) {
            leastSelling.add(allSales.get(i));
        }

        Collections.reverse(leastSelling);

        List<Map<String, Object>> categoryList = new ArrayList<>();
        for (Map.Entry<String, Double> entry : categorySales.entrySet()) {
            categoryList.add(Map.of("name", entry.getKey(), "value", entry.getValue()));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("topSelling", topSelling);
        response.put("leastSelling", leastSelling);
        response.put("categorySales", categoryList);

        return response;
    }
}
