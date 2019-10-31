package com.cars.a2.exceptions;

public class EntityFailedToSaveException extends RuntimeException {
    public EntityFailedToSaveException(String message) {
        super(message);
    }
}
