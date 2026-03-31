package com.swiftdrop.controller;

import com.swiftdrop.entity.Order;
import com.swiftdrop.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class AdminController {

    private final OrderRepository orderRepository;

    public AdminController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrders", orderRepository.count());
        stats.put("inTransit", orderRepository.countByStatus(Order.Status.IN_TRANSIT));
        stats.put("delivered", orderRepository.countByStatus(Order.Status.DELIVERED));
        stats.put("assigned", orderRepository.countByStatus(Order.Status.ASSIGNED));
        stats.put("pending", orderRepository.countByStatus(Order.Status.PLACED));
        stats.put("averageRating", 4.8); // Mock average rating
        return ResponseEntity.ok(stats);
    }
}
