package com.ecommerce.repository;

import com.ecommerce.model.Cart;
import com.ecommerce.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
	Optional<Cart> findByUser(User user);
}
