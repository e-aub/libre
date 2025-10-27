package com.libre.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserDto {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private int age;
    private String role;
}
