package com.cars.a2.exceptions;

import com.cars.a2.models.ErrorDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(CustomizedResponseEntityExceptionHandler.class);

    @ExceptionHandler(ConnectionTemporarilyLostException.class)
    public final ResponseEntity<ErrorDetails> handleConnectionTemporarilyLostException(ConnectionTemporarilyLostException e) {
        logger.info("Database connection loss");
        ErrorDetails errorDetails = new ErrorDetails("503", e.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(EntityFailedToSaveException.class)
    public final ResponseEntity<ErrorDetails> handleEntityFailedToSaveException(EntityFailedToSaveException e) {
        logger.info("Wrong data arrived!");
        ErrorDetails errorDetails = new ErrorDetails("500", e.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UnexpectedBehaviourException.class)
    public final ResponseEntity<ErrorDetails> handleUnexpectedBehaviourException(UnexpectedBehaviourException e) {
        logger.info("The application behaves unexpectedly!");
        ErrorDetails errorDetails = new ErrorDetails("500", e.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public final ResponseEntity<ErrorDetails> handleEntityNotFoundException(EntityNotFoundException e) {
        logger.info("The desired entity is not found!");
        ErrorDetails errorDetails = new ErrorDetails("404", e.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }
}
