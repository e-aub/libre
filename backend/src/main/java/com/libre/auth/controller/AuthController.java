package com.libre.auth.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libre.auth.dto.*;
import com.libre.auth.service.*;
import com.libre.redis.RedisService;
import com.libre.user.service.UserService;
import com.libre.utils.Result;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController

@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService, RedisService redisService, JwtService jwtService) {
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
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        Result<Map<String, String>, Map<String, String>> result = authService.login(request);

        if (result.isErr()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result.getError());
        }

        Cookie refreshTokenCookie = new Cookie("refreshToken", result.getValue().get("refreshToken"));
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(refreshTokenCookie);
        return ResponseEntity.ok(new LoginResponse(result.getValue().get("accessToken")));
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refreshToken", required = false) String refreshToken, HttpServletResponse response) {
        Result<LoginResponse, Map<String, String>> result = authService.validateRefreshTokenAndGetNewAccessToken(refreshToken);
        if (result.isErr()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result.getError());
        }
        String accessToken = result.getValue().getToken();
        return ResponseEntity.ok(new LoginResponse(accessToken));
    }
}
