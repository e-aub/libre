package com.libre.auth.dto;

public class LoginRequest {
    private String emailOrUsername;
    private String password;

    public String getEmailOrUsername(){return this.emailOrUsername;}
    public String getPassword(){return this.password;}

    public void setEmail(String emailOrUsername) {
        this.emailOrUsername = emailOrUsername;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}




