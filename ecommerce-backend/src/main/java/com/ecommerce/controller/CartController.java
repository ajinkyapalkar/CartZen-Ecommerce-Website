package com.ecommerce.controller;

import org.springframework.web.bind.annotation.*;

import com.ecommerce.model.Cart;
import com.ecommerce.service.CartService;
import com.ecommerce.service.UserService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;
    private final UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @GetMapping
    public Cart getCart(@RequestHeader("Authorization") String authHeader) {
        return cartService.getCart(userService.getCurrentUser(authHeader));
    }

    @PostMapping("/add/{productId}")
    public Cart addToCart(@PathVariable Long productId,
                          @RequestHeader("Authorization") String authHeader) {
        return cartService.addToCart(productId, userService.getCurrentUser(authHeader));
    }
    
    @PostMapping("/decrease/{productId}")
    public Cart decreaseQuantity(
            @PathVariable Long productId,
            @RequestHeader("Authorization") String authHeader) {

        return cartService.decreaseQuantity(
                productId,
                userService.getCurrentUser(authHeader)
        );
    }

    @PostMapping("/remove/{productId}")
    public Cart removeFromCart(@PathVariable Long productId,
                               @RequestHeader("Authorization") String authHeader) {
        return cartService.removeFromCart(productId, userService.getCurrentUser(authHeader));
    }

    @PostMapping("/clear")
    public Cart clearCart(@RequestHeader("Authorization") String authHeader) {
        return cartService.clearCart(userService.getCurrentUser(authHeader));
    }
}
