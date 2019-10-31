package com.cars.a2.services;

import com.cars.a2.exceptions.ConnectionTemporarilyLostException;
import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.models.InheritanceTax;
import com.cars.a2.repositories.InheritanceTaxRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class InheritanceTaxService {

    private static final Logger logger = LoggerFactory.getLogger(InheritanceTaxService.class);

    private InheritanceTaxRepository inheritanceTaxRepository;

    public InheritanceTaxService(InheritanceTaxRepository inheritanceTaxRepository) {
        this.inheritanceTaxRepository = inheritanceTaxRepository;
    }

    public ResponseEntity<Object> getChargeForInheritanceTax(String kW, String age) {
        try {
            InheritanceTax inheritanceTax = inheritanceTaxRepository.findByKW(kW).orElseThrow(() -> new EntityNotFoundException("InheritanceTax is not found!"));
            Integer returnValue = null;
            switch (age) {
                case "young":
                    returnValue = inheritanceTax.getYoung();
                    break;
                case "mediumAged":
                    returnValue = inheritanceTax.getMediumAged();
                    break;
                case "old":
                    returnValue = inheritanceTax.getOld();
                    break;
            }
            return new ResponseEntity<>(returnValue, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new ConnectionTemporarilyLostException("Couldn't get inheritance tax charge at the moment!");
        }
    }
}
