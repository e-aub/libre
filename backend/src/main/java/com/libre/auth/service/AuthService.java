package com.libre.auth.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.libre.auth.dto.*;
import com.libre.common.exception.AuthenticationFailedException;
import com.libre.user.model.User;
import com.libre.user.repository.*;
import com.libre.user.validation.*;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserValidator validator;

    public AuthService(UserRepository userRepository, JwtService jwtService, BCryptPasswordEncoder passwordEncoder, UserValidator validator) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.validator = validator;
    }

    public LoginResponse login(LoginRequest request) {
        LoginInput loginInput = validator.validateLogin(request);

        User user;
        AuthenticationFailedException ex = new AuthenticationFailedException("Invalid Username/Email or Password");
        if (loginInput.isEmail()) {
            user = userRepository.findByEmail(loginInput.getEmail().toLowerCase())
            .orElseThrow(() -> ex);
        } else {
            user = userRepository.findByUsername(loginInput.getUsername())
            .orElseThrow(() ->ex);
        }

        if (!passwordEncoder.matches(loginInput.getPassword(), user.getPassword())) {
            throw ex;
        }

        return new LoginResponse(jwtService.generateToken(user.getUsername(), user.getStringRole()));
    }
}
