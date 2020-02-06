package com.cars.a2.controllers.apis;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface ZipCodeController {

    @GetMapping("/getZipCode/{zipCode}")
    ResponseEntity<Object> getZipCode(@PathVariable String zipCode);
}
