package com.swiftdrop;

import com.swiftdrop.entity.Agent;
import com.swiftdrop.entity.Order;
import com.swiftdrop.entity.User;
import com.swiftdrop.repository.AgentRepository;
import com.swiftdrop.repository.OrderRepository;
import com.swiftdrop.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final AgentRepository agentRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, OrderRepository orderRepository,
                           AgentRepository agentRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.agentRepository = agentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .name("Admin")
                    .email("admin@swiftdrop.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(admin);

            User customer = User.builder()
                    .name("Customer User")
                    .email("customer@swiftdrop.com")
                    .password(passwordEncoder.encode("customer123"))
                    .role(User.Role.CUSTOMER)
                    .build();
            userRepository.save(customer);

            User agentUser = User.builder()
                    .name("Agent User")
                    .email("agent@swiftdrop.com")
                    .password(passwordEncoder.encode("agent123"))
                    .role(User.Role.AGENT)
                    .build();
            userRepository.save(agentUser);
            
            Agent agentDetails = Agent.builder()
                    .user(agentUser)
                    .status(Agent.Status.AVAILABLE)
                    .rating(4.5)
                    .totalDeliveries(120)
                    .build();
            agentRepository.save(agentDetails);

            Order order1 = Order.builder()
                    .orderId("ORD-1001")
                    .customer(customer)
                    .items("2x Pizza, 1x Coke")
                    .pickupAddress("Restaurant A")
                    .deliveryAddress("Home")
                    .estimatedCost(15.0)
                    .paymentMethod("CARD")
                    .status(Order.Status.DELIVERED)
                    .agent(agentUser)
                    .placedAt(LocalDateTime.now().minusHours(2))
                    .deliveredAt(LocalDateTime.now())
                    .build();
            orderRepository.save(order1);
            
            Order order2 = Order.builder()
                    .orderId("ORD-1002")
                    .customer(customer)
                    .items("Groceries")
                    .pickupAddress("Supermarket B")
                    .deliveryAddress("Home")
                    .estimatedCost(45.0)
                    .paymentMethod("CASH")
                    .status(Order.Status.IN_TRANSIT)
                    .agent(agentUser)
                    .placedAt(LocalDateTime.now().minusMinutes(30))
                    .build();
            orderRepository.save(order2);
        }
    }
}
