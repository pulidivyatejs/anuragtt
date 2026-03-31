package com.swiftdrop.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class OrderDTO {
    private Long id;
    private String orderId;
    private UserDTO customer;
    private String items;
    private String pickupAddress;
    private String deliveryAddress;
    private Double estimatedCost;
    private String paymentMethod;
    private String specialInstructions;
    private UserDTO agent;
    private String status;
    private LocalDateTime placedAt;
    private LocalDateTime assignedAt;
    private LocalDateTime pickedUpAt;
    private LocalDateTime deliveredAt;
}
