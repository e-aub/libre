package com.libre.user.service;


import java.net.HttpURLConnection;
import org.springframework.security.core.Authentication;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.libre.auth.dto.*;
import com.libre.auth.security.LibreUserDetails;
import com.libre.auth.service.JwtService;
import com.libre.user.dto.UserDto;
import com.libre.user.model.Role;
import com.libre.user.model.User;
import com.libre.user.repository.UserRepository;
import com.libre.user.validation.UserValidator;
import com.libre.utils.Result;

import java.util.Map;
import java.util.Optional;

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

    public Result<LoginResponse, Map<String, String>> register(RegisterRequest request) {
        Result<Void, Map<String, String>> validateResult = validator.validateAllForRegister(request);
        if (validateResult.isErr()){
            return Result.err(validateResult.getError(), validateResult.getStatusCode());
        }  

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
            return Result.ok(new LoginResponse(jwtService.generateAccessToken(user.getUsername(), user.getRole().name())));
        } catch (DataIntegrityViolationException e) {
            return Result.err(Map.of(
                "usernameOrEmail", "Username or email already exists"
            ), HttpURLConnection.HTTP_BAD_REQUEST);
        }
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<UserDto> getCurrentUser(Authentication authentication) {
        LibreUserDetails userDetails = (LibreUserDetails) authentication.getPrincipal();
    
    return userRepository.findById(userDetails.getId())
            .map(user -> new UserDto(
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getAge(),
                user.getRole().name()
            ));
}
}
