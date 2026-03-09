package com.ecommerce.service;

import com.ecommerce.model.*;
import com.ecommerce.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    public OrderService(OrderRepository orderRepository,
                        CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    //PLACE ORDER
    @Transactional
    public Order placeOrder(User user) {

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PLACED);
        order.setOrderDate(LocalDateTime.now());

        double total = 0;

        for (CartItem cartItem : cart.getItems()) {

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());

            order.getItems().add(orderItem);

            total += cartItem.getQuantity() * cartItem.getProduct().getPrice();
        }

        order.setTotalAmount(total);

        //Save order first
        Order savedOrder = orderRepository.save(order);

        //Clear cart AFTER successful order
        cart.getItems().clear();
        cartRepository.save(cart);

        return savedOrder;
    }

    //GET MY ORDERS
    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }
}

