package com.libre.auth.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.libre.auth.dto.*;
import com.libre.redis.RedisService;
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
    private final RedisService redisService;

    public AuthService(UserRepository userRepository, JwtService jwtService, BCryptPasswordEncoder passwordEncoder, UserValidator validator, RedisService redisService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.validator = validator;
        this.redisService = redisService;
    }

    public Result<Map<String, String>, Map<String, String>> login(LoginRequest request) {
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

        var tokens = jwtService.generateTokens(user.getUsername(), user.getRole().name());

        redisService.saveRefreshToken(tokens.get("refreshToken"), user.getId());


        return Result.ok(tokens);
    }

    public Result<LoginResponse, Map<String, String>> validateRefreshTokenAndGetNewAccessToken(String refreshToken){
         if (refreshToken == null || !redisService.tokenExists(refreshToken)) {
            return Result.err(Map.of("error", "Invalid refresh token"));
        }

        Long userId = redisService.getUserIdByToken(refreshToken);
        if (userId == null) {
            return Result.err(Map.of("error", "Invalid refresh token"));
        }

        var userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return Result.err(Map.of("error", "User not found"));
        }

        var user = userOpt.get();
        var accessToken = jwtService.generateAccessToken(user.getUsername(), user.getRole().name());
        return Result.ok(new LoginResponse(accessToken));
    }    
    
}
