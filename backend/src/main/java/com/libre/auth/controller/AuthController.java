package com.libre.auth.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libre.auth.dto.*;
import com.libre.auth.service.*;
import com.libre.user.service.UserService;
import com.libre.utils.Result;

@RestController

@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        Result<LoginResponse, Map<String, String>> response = userService.register(request);
        if (response.isErr()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response.getError());
        }
        return ResponseEntity.ok(response.getValue());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Result<LoginResponse, Map<String, String>> response = authService.login(request);

        if (response.isErr()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(response.getError());
        }
        return ResponseEntity.ok(response.getValue());
    }
}
