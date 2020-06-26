package com.cars.a2.services;

import com.cars.a2.exceptions.ConnectionTemporarilyLostException;
import com.cars.a2.exceptions.EntityFailedToSaveException;
import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.models.Company;
import com.cars.a2.models.Utility;
import com.cars.a2.models.Witness;
import com.cars.a2.repositories.UtilityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


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

    public ResponseEntity<Object> getAllUtilities() {
        try {
            List<Utility> utilities = utilityRepository.findAll();
            return new ResponseEntity<>(utilities, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new ConnectionTemporarilyLostException("Couldn't get utility at the moment!");
        }
    }

    public ResponseEntity<Object> saveUtility(Utility utility) {
        try {
            utilityRepository.save(utility);
            return new ResponseEntity<>(utility, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("Utility couldn't be saved!");
        }
    }

    public ResponseEntity<Object> updateUtility(List<Utility> utilities) {
        try {
            List<Utility> savedUtilities = new ArrayList<>();
            for (Utility utility: utilities) {
                Utility savedUtility = utilityRepository.saveAndFlush(utility);
                savedUtilities.add(savedUtility);
            }
            return new ResponseEntity<>(savedUtilities, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("Witness couldn't be saved!");
        }
    }
}
