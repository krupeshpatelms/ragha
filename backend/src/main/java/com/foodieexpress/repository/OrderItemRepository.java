package com.foodieexpress.repository;

import com.foodieexpress.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("SELECT oi.food, SUM(oi.quantity), SUM(oi.quantity * oi.price), COUNT(DISTINCT oi.order) FROM OrderItem oi GROUP BY oi.food ORDER BY SUM(oi.quantity) DESC")
    List<Object[]> getFoodSales();
}
