package com.cars.a2.controllers;

import com.cars.a2.controllers.apis.UtilityController;
import com.cars.a2.models.Utility;
import com.cars.a2.services.UtilityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class UtilityControllerImpl implements UtilityController {

    private static final Logger logger = LoggerFactory.getLogger(UtilityControllerImpl.class);

    private UtilityService utilityService;

    public UtilityControllerImpl(UtilityService utilityService) {
        this.utilityService = utilityService;
    }

    @Override
    public ResponseEntity<Object> getUtility(String name) {
        return utilityService.getUtility(name);
    }

    @Override
    public ResponseEntity<Object> getAllUtilities() {
        return utilityService.getAllUtilities();
    }

    @Override
    public ResponseEntity<Object> saveUtility(Utility utility) {
        return utilityService.saveUtility(utility);
    }

    @Override
    public ResponseEntity<Object> updateUtility(List<Utility> utilities) {
        return utilityService.updateUtility(utilities);
    }
}
