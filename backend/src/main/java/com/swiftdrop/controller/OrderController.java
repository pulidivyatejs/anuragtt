package com.swiftdrop.controller;

import com.swiftdrop.entity.Order;
import com.swiftdrop.entity.User;
import com.swiftdrop.repository.OrderRepository;
import com.swiftdrop.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderController(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getOrders(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        if (user.getRole() == User.Role.ADMIN) {
            return ResponseEntity.ok(orderRepository.findAll());
        } else if (user.getRole() == User.Role.CUSTOMER) {
            return ResponseEntity.ok(orderRepository.findByCustomer(user));
        } else if (user.getRole() == User.Role.AGENT) {
            return ResponseEntity.ok(orderRepository.findByAgent(user));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order, Authentication authentication) {
        User customer = userRepository.findByEmail(authentication.getName()).orElseThrow();
        order.setCustomer(customer);
        order.setStatus(Order.Status.PLACED);
        return ResponseEntity.ok(orderRepository.save(order));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody Order updatedOrder) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(updatedOrder.getStatus());
        if (updatedOrder.getStatus() == Order.Status.DELIVERED) {
            order.setDeliveredAt(java.time.LocalDateTime.now());
        } else if (updatedOrder.getStatus() == Order.Status.PICKED_UP) {
            order.setPickedUpAt(java.time.LocalDateTime.now());
        }
        return ResponseEntity.ok(orderRepository.save(order));
    }
}
