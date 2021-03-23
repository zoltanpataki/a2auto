package com.cars.a2.services;

import com.cars.a2.exceptions.EntityFailedToSaveException;
import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.exceptions.UnexpectedBehaviourException;
import com.cars.a2.models.Salesman;
import com.cars.a2.models.Witness;
import com.cars.a2.repositories.WitnessRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WitnessService {

    private static final Logger logger = LoggerFactory.getLogger(WitnessService.class);

    private WitnessRepository witnessRepository;

    public WitnessService(WitnessRepository witnessRepository) {
        this.witnessRepository = witnessRepository;
    }

    public ResponseEntity<Object> saveNewWitness(Witness witness) {
        try {
            witnessRepository.save(witness);
            return new ResponseEntity<>(witness, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("Witness couldn't be saved!");
        }
    }

    public ResponseEntity<Object> getSingleWitness(String name) {
        List<Witness> witnesses = witnessRepository.findByNameContaining(name).orElseThrow(() -> new EntityNotFoundException("Witnesses are not found by name!"));
        return new ResponseEntity<>(witnesses, HttpStatus.OK);
    }

    public ResponseEntity<Object> getAllWitnesses() {
        try {
            List<Witness> witnesses = witnessRepository.findAll();
            return new ResponseEntity<>(witnesses, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new UnexpectedBehaviourException("Something went wrong while fetching all witnesses!");
        }
    }

    public ResponseEntity<Object> updateWitness(Witness witness) {
        try {
            witnessRepository.save(witness);
            return new ResponseEntity<>(witness, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("Witness couldn't be updated!");
        }
    }

    public ResponseEntity<Object> deleteWitness(Long id) {
        try {
            witnessRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityNotFoundException("Witness couldn't be deleted!");
        }
    }
}
