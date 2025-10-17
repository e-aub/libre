package com.libre.utils;

public class Result<T, E> {
    private final T value;
    private final E error;
    private final boolean ok; 

    private Result(T value, E error, boolean ok) {
        this.value = value;
        this.error = error;
        this.ok = ok;
    }


    public static <T, E> Result<T, E> ok(T value) {
        return new Result<>(value, null, true);
    }

    public static <T, E> Result<T, E> ok() {
        return new Result<>(null, null, true);
    }

    public static <T, E> Result<T, E> err(E error) {
        return new Result<>(null, error, false);
    }

    public static <T, E> Result<T, E> err() {
        return new Result<>(null, null, false);
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
}
