package com.libre.service;

import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.libre.dto.LoginInput;
import com.libre.dto.LoginRequest;
import com.libre.exception.AuthenticationFailedException;
import com.libre.model.User;
import com.libre.repository.UserRepository;
import com.libre.validation.UserValidator;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtService jwtService, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(LoginRequest request) {
        LoginInput loginInput = UserValidator.validateLogin(request);

        User user;
        if (loginInput.isEmail()) {
            user = userRepository.findByEmail(loginInput.getEmail().toLowerCase())
            .orElseThrow(() -> new AuthenticationFailedException(Map.of("email", "Invalid email")));
        } else {
            user = userRepository.findByUsername(loginInput.getUsername())
            .orElseThrow(() -> new AuthenticationFailedException(Map.of("username", "Invalid username")));
        }

        if (!passwordEncoder.matches(loginInput.getPassword(), user.getPassword())) {
            throw new AuthenticationFailedException(Map.of("password", "Invalid Password"));
        }

        return jwtService.generateToken(user.getUsername(), user.getStringRole());
    }
}
