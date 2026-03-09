package com.ecommerce.repository;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}

