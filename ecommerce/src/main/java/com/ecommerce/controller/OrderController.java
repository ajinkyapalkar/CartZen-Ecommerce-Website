package com.ecommerce.controller;

import com.ecommerce.model.Order;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.security.JwtUtil;
import com.ecommerce.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public OrderController(OrderService orderService,
                           JwtUtil jwtUtil,
                           UserRepository userRepository) {
        this.orderService = orderService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    //Extract user from token
    private User getCurrentUser(String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing Authorization header");
        }

        String token = authHeader.substring(7);
        String username = jwtUtil.extractUsername(token);

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    //PLACE ORDER
    @PostMapping("/place")
    public Order placeOrder(@RequestHeader("Authorization") String authHeader) {
        User user = getCurrentUser(authHeader);
        return orderService.placeOrder(user);
    }

    //GET MY ORDERS
    @GetMapping
    public List<Order> getMyOrders(@RequestHeader("Authorization") String authHeader) {
        User user = getCurrentUser(authHeader);
        return orderService.getOrdersByUser(user);
    }
}


