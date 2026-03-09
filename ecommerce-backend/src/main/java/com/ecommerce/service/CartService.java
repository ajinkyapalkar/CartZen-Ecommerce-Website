package com.ecommerce.service;

import org.springframework.stereotype.Service;

import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.*;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository,
                       ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    public Cart getCart(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart);
                });
    }

    public Cart addToCart(Long productId, User user) {

        Cart cart = getCart(user);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        for (CartItem item : cart.getItems()) {
            if (item.getProduct().getId().equals(productId)) {
                item.setQuantity(item.getQuantity() + 1);
                return cartRepository.save(cart);
            }
        }

        CartItem item = new CartItem(cart, product, 1);
        cart.getItems().add(item);

        return cartRepository.save(cart);
    }

    public Cart removeFromCart(Long productId, User user) {
        Cart cart = getCart(user);
        cart.getItems().removeIf(i -> i.getProduct().getId().equals(productId));
        return cartRepository.save(cart);
    }

    public Cart decreaseQuantity(Long productId, User user) {
        Cart cart = getCart(user);

        cart.getItems().removeIf(i -> {
            if (i.getProduct().getId().equals(productId)) {
                i.setQuantity(i.getQuantity() - 1);
                return i.getQuantity() <= 0;
            }
            return false;
        });

        return cartRepository.save(cart);
    }

    public Cart clearCart(User user) {
        Cart cart = getCart(user);
        cart.getItems().clear();
        return cartRepository.save(cart);
    }
}

