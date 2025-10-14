package com.libre.exception;

import java.util.Map;

public class AuthenticationFailedException extends RuntimeException {
    private final Map<String, String> errors;

    public AuthenticationFailedException(String message) {
        super(message);
        this.errors = null;
    }

    public AuthenticationFailedException(Map<String, String> errors) {
        super("Authentication failed");
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
