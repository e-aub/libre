package com.libre.dto;

public class LoginInput {
    private final String username; 
    private final String email;   
    private final String password;

    private LoginInput(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public static LoginInput forEmail(String email, String password) {
        return new LoginInput(null, email.toLowerCase(), password);
    }

    public static LoginInput forUsername(String username, String password) {
        return new LoginInput(username, null, password);
    }

    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }

    public boolean isEmail() { return email != null; }
    public boolean isUsername() { return username != null; }
}
