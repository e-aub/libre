package com.libre.service;

import com.libre.dto.LoginResponse;
import com.libre.dto.RegisterRequest;
import com.libre.model.Role;
import com.libre.model.User;
import com.libre.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private static final Pattern EMAIL_REGEX = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    private static final Pattern USERNAME_REGEX = Pattern.compile("^[A-Za-z0-9_]{3,20}$");
    private static final Pattern NAME_REGEX = Pattern.compile("^[A-Za-z ]{3,20}$");

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse register(RegisterRequest request) {
        String firstName = request.getFirstName() != null ? request.getFirstName().trim() : null;
        String lastName = request.getLastName() != null ? request.getLastName().trim() : null;
        Integer age = request.getAge();
        String username = request.getUsername() != null ? request.getUsername().trim() : null;
        String email = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : null;
        String password = request.getPassword();

        if (firstName == null || !NAME_REGEX.matcher(firstName).matches()) {
            throw new IllegalArgumentException("First name is required and must be 3-20 alphabetic characters");
        }

        if (lastName == null || !NAME_REGEX.matcher(lastName).matches()) {
            throw new IllegalArgumentException("Last name is required and must be 3-20 alphabetic characters");
        }

        if (username == null || !USERNAME_REGEX.matcher(username).matches()) {
            throw new IllegalArgumentException("Username must be 3-20 chars, alphanumeric or underscore");
        }

        if (email == null || !EMAIL_REGEX.matcher(email).matches()) {
            throw new IllegalArgumentException("Email is invalid");
        }

        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }

        if (age == null || age < 13 || age > 120) {
            throw new IllegalArgumentException("Age is required and must be between 13 and 120");
        }

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setUsername(username);
        user.setAge(age);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.USER);

        try {
            userRepository.save(user);
            return new LoginResponse("jwt");
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Username or email already exists");
        }
    }
}
