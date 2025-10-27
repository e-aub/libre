package com.libre.utils;

public class Result<T, E> {
    private final T value;
    private final E error;
    private final boolean ok;
    private final int statusCode;

    private Result(T value, E error, int statusCode, boolean ok) {
        this.value = value;
        this.error = error;
        this.statusCode = statusCode;
        this.ok = ok;
    }


    public static <T, E> Result<T, E> ok(T value) {
        return new Result<>(value, null, 0, true);
    }

    public static <T, E> Result<T, E> ok() {
        return new Result<>(null, null, 0, true);
    }

    public static <T, E> Result<T, E> err(E error, int statusCode) {
        return new Result<>(null, error, statusCode, false);
    }

    public static <T, E> Result<T, E> err(int statusCode) {
        return new Result<>(null, null, statusCode, false);
    }


    public boolean isOk() {
        return ok;
    }

    public boolean isErr() {
        return !ok;
    }

    public boolean hasValue() {
        return ok && value != null;
    }

    public boolean hasError() {
        return !ok && error != null;
    }


    public T getValue() {
        return value;
    }

    public E getError() {
        return error;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
