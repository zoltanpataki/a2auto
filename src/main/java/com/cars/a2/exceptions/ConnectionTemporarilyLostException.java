package com.cars.a2.exceptions;

public class ConnectionTemporarilyLostException extends RuntimeException {
    public ConnectionTemporarilyLostException(String message) {
        super(message);
    }
}
