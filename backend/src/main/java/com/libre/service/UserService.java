package com.libre.service;

import com.libre.dto.LoginResponse;
import com.libre.dto.RegisterRequest;
import com.libre.exception.FieldValidationException;
import com.libre.model.Role;
import com.libre.model.User;
import com.libre.repository.UserRepository;
import com.libre.validation.UserValidator;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
