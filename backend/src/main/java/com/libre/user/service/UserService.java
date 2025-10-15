package com.libre.user.service;



import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.libre.auth.dto.*;
import com.libre.auth.service.JwtService;
import com.libre.common.exception.FieldValidationException;
import com.libre.user.model.Role;
import com.libre.user.model.User;
import com.libre.user.repository.UserRepository;
import com.libre.user.validation.UserValidator;

import java.util.Map;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserValidator validator;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, UserValidator validator, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.validator = validator;
        this.jwtService = jwtService;
    }

    public LoginResponse register(RegisterRequest request) {
        validator.validateAllForRegister(request);

        User user = new User();
        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        user.setUsername(request.getUsername().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAge(request.getAge());
        user.setRole(Role.USER);

        try {
            userRepository.save(user);
            return new LoginResponse(jwtService.generateToken(user.getUsername(), user.getStringRole()));
        } catch (DataIntegrityViolationException e) {
            throw new FieldValidationException(Map.of(
                "usernameOrEmail", "Username or email already exists"
            ));
        }
    }
}
