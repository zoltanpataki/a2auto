package com.cars.a2.services;

import com.cars.a2.exceptions.ConnectionTemporarilyLostException;
import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.models.Utility;
import com.cars.a2.repositories.UtilityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class UtilityService {

    private static final Logger logger = LoggerFactory.getLogger(UtilityService.class);

    public UtilityRepository utilityRepository;

    public UtilityService(UtilityRepository utilityRepository) {
        this.utilityRepository = utilityRepository;
    }

    public ResponseEntity<Object> getUtility(String name) {
        try {
            Utility utility = utilityRepository.findByName(name).orElseThrow(() -> new EntityNotFoundException("Utility is not found!"));
            return new ResponseEntity<>(utility, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new ConnectionTemporarilyLostException("Couldn't get utility at the moment!");
        }
    }
}
