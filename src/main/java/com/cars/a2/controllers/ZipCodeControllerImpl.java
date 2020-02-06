package com.cars.a2.controllers;

import com.cars.a2.controllers.apis.ZipCodeController;
import com.cars.a2.services.ZipCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ZipCodeControllerImpl implements ZipCodeController {

    private static final Logger logger = LoggerFactory.getLogger(ZipCodeControllerImpl.class);

    private ZipCodeService zipCodeService;

    public ZipCodeControllerImpl(ZipCodeService zipCodeService) {
        this.zipCodeService = zipCodeService;
    }

    @Override
    public ResponseEntity<Object> getZipCode(String zipCode) {
        return zipCodeService.getZipCode(zipCode);
    }
}
