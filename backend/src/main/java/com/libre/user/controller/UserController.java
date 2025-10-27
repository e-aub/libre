package com.libre.user.controller;
import org.springframework.security.core.Authentication;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libre.user.dto.UserDto;
import com.libre.user.service.UserService;


@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/current_user")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        Optional<UserDto> optUser = userService.getCurrentUser(authentication);
        if (optUser.isEmpty()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(optUser.get());
    }    

}