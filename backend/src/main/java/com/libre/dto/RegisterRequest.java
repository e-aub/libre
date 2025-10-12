package com.libre.dto;

public class RegisterRequest {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Integer age;
    private String password;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String name) { this.firstName = name; }

    public String getLastName() { return lastName; }
    public void setLastName(String name) { this.lastName = name; }

    public String getFullName() { return this.firstName + this.lastName; }

    public Integer getAge() {return this.age;}
    public void setAge(Integer age) {this.age = age;}
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
