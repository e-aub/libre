package com.libre.user.validation;

import java.io.ObjectInputFilter.Status;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;
import java.net.HttpURLConnection;
import org.springframework.stereotype.Component;

import com.libre.auth.dto.LoginInput;
import com.libre.auth.dto.LoginRequest;
import com.libre.auth.dto.RegisterRequest;
import com.libre.utils.Result;

@Component
public class UserValidator {

    private static final Pattern EMAIL_REGEX = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    private static final Pattern USERNAME_REGEX = Pattern.compile("^[A-Za-z0-9_]{3,20}$");
    private static final Pattern NAME_REGEX = Pattern.compile("^[A-Za-z ]{3,20}$");
    private static final Pattern PASSWORD_REGEX = Pattern.compile(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    );


    public boolean isFirstNameValid(String firstName) {
        return firstName != null && NAME_REGEX.matcher(firstName).matches();
    }

    public boolean isLastNameValid(String lastName) {
        return lastName != null && NAME_REGEX.matcher(lastName).matches();
    }

    public boolean isUsernameValid(String username) {
        return username != null && USERNAME_REGEX.matcher(username).matches();
    }

    public boolean isEmailValid(String email) {
        return email != null && EMAIL_REGEX.matcher(email.toLowerCase()).matches();
    }

    public boolean isPasswordValid(String password) {
        return password != null && PASSWORD_REGEX.matcher(password).matches();
    }

    public boolean isAgeValid(Integer age) {
        return age != null && age >= 13 && age <= 120;
    }


    public Result<Void, Map<String, String>> validateAllForRegister(RegisterRequest form) {
        Map<String, String> errors = new HashMap<>();

        if (!isFirstNameValid(form.getFirstName())) {
            errors.put("firstName", "First name is required and must be 3-20 alphabetic characters");
        }
        if (!isLastNameValid(form.getLastName())) {
            errors.put("lastName", "Last name is required and must be 3-20 alphabetic characters");
        }
        if (!isUsernameValid(form.getUsername())) {
            errors.put("username", "Username must be 3-20 chars, alphanumeric or underscore");
        }
        if (!isEmailValid(form.getEmail())) {
            errors.put("email", "Email is invalid");
        }
        if (!isPasswordValid(form.getPassword())) {
            errors.put("password", "Password must be at least 8 characters, include uppercase, lowercase, digit and special character");
        }
        if (!isAgeValid(form.getAge())) {
            errors.put("age", "Age is required and must be between 13 and 120");
        }

        if (!errors.isEmpty()) {
            return Result.err(errors, HttpURLConnection.HTTP_BAD_REQUEST);
        }

        return Result.ok(); 
    }


    public Result<LoginInput, Map<String, String>> validateLogin(LoginRequest form) {
        Map<String, String> errors = new HashMap<>();
        String input = form.getEmailOrUsername();
        String password = form.getPassword();

        if (input == null || input.isBlank()) {
            errors.put("usernameOrEmail", "Username or email is required");
            return Result.err(errors, HttpURLConnection.HTTP_BAD_REQUEST);
        }

        boolean inputValid;
        LoginInput loginInput;

        if (input.contains("@")) {
            inputValid = isEmailValid(input);
            if (!inputValid) errors.put("usernameOrEmail", "Email is invalid");
            if (!isPasswordValid(password)) errors.put("password", "Password is invalid");
            loginInput = LoginInput.forEmail(input, password);
        } else {
            inputValid = isUsernameValid(input);
            if (!inputValid) errors.put("usernameOrEmail", "Username must be 3-20 chars, alphanumeric or underscore");
            if (!isPasswordValid(password)) errors.put("password", "Password is invalid");
            loginInput = LoginInput.forUsername(input, password);
        }

        if (!errors.isEmpty()) return Result.err(errors, HttpURLConnection.HTTP_BAD_REQUEST);

        return Result.ok(loginInput);
    }
}
