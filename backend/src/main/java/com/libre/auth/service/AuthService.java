package com.libre.auth.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.libre.auth.dto.*;
import com.libre.user.model.User;
import com.libre.user.repository.*;
import com.libre.user.validation.*;
import com.libre.utils.Result;

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

    public Result<LoginResponse, Map<String, String>> login(LoginRequest request) {
        Result<LoginInput, Map<String, String>> validateResult = validator.validateLogin(request);
        if (validateResult.isErr()){
            return Result.err(validateResult.getError());
        }
        LoginInput loginInput = validateResult.getValue();
        Optional<User> maybeUser = loginInput.isEmail() ? 
        userRepository.findByEmail(loginInput.getEmail().toLowerCase()) :
        userRepository.findByUsername(loginInput.getUsername());
        
        if (!maybeUser.isPresent()){
            return Result.err(Map.of("error", "Invalid credentials"));
        }
        
        User user = maybeUser.get();
        if (!passwordEncoder.matches(loginInput.getPassword(), user.getPassword())) {
            return Result.err(Map.of("error", "Invalid credentials"));
        }

        return Result.ok(new LoginResponse(jwtService.generateAccessToken(user.getUsername(), user.getRole().name())));
    }
}
