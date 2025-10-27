package com.libre.user.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.libre.user.model.User;


public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Optional<User> findById(Long id);
}