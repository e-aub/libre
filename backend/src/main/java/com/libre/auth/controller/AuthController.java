package com.libre.auth.controller;

import java.util.Map;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libre.auth.dto.*;
import com.libre.auth.security.LibreUserDetails;
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
    private final RedisService redisService;

    public AuthController(UserService userService, AuthService authService, RedisService redisService, JwtService jwtService) {
        this.userService = userService;
        this.authService = authService;
        this.redisService = redisService;
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
            return ResponseEntity.status(result.getStatusCode()).body(result.getError());
        }

        Cookie refreshTokenCookie = new Cookie("refreshToken", result.getValue().get("refreshToken"));
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(refreshTokenCookie);
        System.err.println(result.getValue().get("accessToken"));
        return ResponseEntity.ok(new LoginResponse(result.getValue().get("accessToken")));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(Authentication authentication, @CookieValue(value = "refreshToken", required = false) String refreshToken, HttpServletResponse response) {
        try {
            System.out.println(refreshToken);
            if (refreshToken != null && !refreshToken.isEmpty()) {
                redisService.deleteRefreshToken(refreshToken);
            }

            this.clearRefreshTokenCookie(response);

            return ResponseEntity.ok(Map.of("message", "Logged out successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Logout failed"));
        }
    }

    private void clearRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("refreshToken", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refreshToken", required = false) String refreshToken, HttpServletResponse response) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "invalid refresh token"));
        }
        try {
            Result<LoginResponse, Map<String, String>> result = authService.validateRefreshTokenAndGetNewAccessToken(refreshToken);
            if (result.isErr()) {
                return ResponseEntity.status(result.getStatusCode()).body(result.getError());
            }
            String accessToken = result.getValue().getAccessToken();
            return ResponseEntity.ok(new LoginResponse(accessToken));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "internal server error"));

        }

    }

}
