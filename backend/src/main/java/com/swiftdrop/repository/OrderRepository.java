package com.swiftdrop.repository;

import com.swiftdrop.entity.Order;
import com.swiftdrop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomer(User customer);
    List<Order> findByAgent(User agent);
    long countByStatus(Order.Status status);
}
