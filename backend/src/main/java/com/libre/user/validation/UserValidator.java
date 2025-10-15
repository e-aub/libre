package com.libre.user.validation;


import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

import com.libre.auth.dto.*;
import com.libre.common.exception.FieldValidationException;


@Component
public class UserValidator {

    private static final Pattern EMAIL_REGEX = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    private static final Pattern USERNAME_REGEX = Pattern.compile("^[A-Za-z0-9_]{3,20}$");
    private static final Pattern NAME_REGEX = Pattern.compile("^[A-Za-z ]{3,20}$");
    private static final Pattern PASSWORD_REGEX = Pattern.compile(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    );

    public void validateFirstName(String firstName) {
        if (firstName == null || !NAME_REGEX.matcher(firstName).matches()) {
            throw new FieldValidationException(Map.of(
                "firstName", "First name is required and must be 3-20 alphabetic characters"
            ));
        }
    }

    public void validateLastName(String lastName) {
        if (lastName == null || !NAME_REGEX.matcher(lastName).matches()) {
            throw new FieldValidationException(Map.of(
                "lastName", "Last name is required and must be 3-20 alphabetic characters"
            ));
        }
    }

    public void validateUsername(String username) {
        if (username == null || !USERNAME_REGEX.matcher(username).matches()) {
            throw new FieldValidationException(Map.of(
                "username", "Username must be 3-20 chars, alphanumeric or underscore"
            ));
        }
    }

    public void validateEmail(String email) {
        if (email == null || !EMAIL_REGEX.matcher(email.toLowerCase()).matches()) {
            throw new FieldValidationException(Map.of(
                "email", "Email is invalid"
            ));
        }
    }

    public void validatePassword(String password) {
        if (password == null || !PASSWORD_REGEX.matcher(password).matches()) {
            throw new FieldValidationException(Map.of(
                "password", "Password must be at least 8 characters, include uppercase, lowercase, digit and special character"
            ));
        }
    }

    public void validateAge(Integer age) {
        if (age == null || age < 13 || age > 120) {
            throw new FieldValidationException(Map.of(
                "age", "Age is required and must be between 13 and 120"
            ));
        }
    }


    public void validateAllForRegister(RegisterRequest form) {
        validateFirstName(form.getFirstName());
        validateLastName(form.getLastName());
        validateUsername(form.getUsername());
        validateEmail(form.getEmail());
        validatePassword(form.getPassword());
        validateAge(form.getAge());
    }

   public LoginInput validateLogin(LoginRequest form) {
    String input = form.getEmailOrUsername();
    String password = form.getPassword();

    if (input == null || input.isBlank()) {
        throw new FieldValidationException(Map.of(
            "usernameOrEmail", "Username or email is required"
        ));
    }

    if (input.contains("@")) {
        validateEmail(input);
        validatePassword(password);
        return LoginInput.forEmail(input, password);
    } else {
        if (!USERNAME_REGEX.matcher(input).matches()) {
            throw new FieldValidationException(Map.of(
                "usernameOrEmail", "Username must be 3-20 chars, alphanumeric or underscore"
            ));
        }
        validatePassword(password);
        return LoginInput.forUsername(input, password);
    }
}


}
