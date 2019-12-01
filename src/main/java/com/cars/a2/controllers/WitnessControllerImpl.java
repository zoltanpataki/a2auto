package com.cars.a2.controllers;

import com.cars.a2.controllers.apis.WitnessController;
import com.cars.a2.models.Witness;
import com.cars.a2.services.WitnessService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WitnessControllerImpl implements WitnessController {

    private static final Logger LOGGER = LoggerFactory.getLogger(WitnessControllerImpl.class);
    
    private WitnessService witnessService;

    public WitnessControllerImpl(WitnessService witnessService) {
        this.witnessService = witnessService;
    }

    @Override
    public ResponseEntity<Object> saveWitness(Witness witness) {
        return witnessService.saveNewWitness(witness);
    }

    @Override
    public ResponseEntity<Object> getWitness(String name) {
        return witnessService.getSingleWitness(name);
    }

    @Override
    public ResponseEntity<Object> getAllWitnesses() {
        return witnessService.getAllWitnesses();
    }

    @Override
    public ResponseEntity<Object> updateWitness(Witness witness) {
        return witnessService.updateWitness(witness);
    }

    @Override
    public ResponseEntity<Object> deleteWitness(Long id) {
        return witnessService.deleteWitness(id);
    }
}
