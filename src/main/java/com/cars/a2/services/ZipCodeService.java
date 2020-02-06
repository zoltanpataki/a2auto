package com.cars.a2.services;

import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.models.ZipCode;
import com.cars.a2.repositories.ZipCodeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class ZipCodeService {

    private static final Logger logger = LoggerFactory.getLogger(ZipCodeService.class);

    private ZipCodeRepository zipCodeRepository;

    public ZipCodeService(ZipCodeRepository zipCodeRepository) {
        this.zipCodeRepository = zipCodeRepository;
    }

    public ResponseEntity<Object> getZipCode(String zipCode) {
        System.out.println(zipCode);
        ZipCode searchedZipCode = zipCodeRepository.findByCode(zipCode).orElseThrow(() -> new EntityNotFoundException("ZipCode is not found by zipCode string!"));
        return new ResponseEntity<>(searchedZipCode, HttpStatus.OK);
    }
}
