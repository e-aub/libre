package com.libre.dto;

public class RegisterRequest {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Integer age;
    private String password;

    // getters/setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
