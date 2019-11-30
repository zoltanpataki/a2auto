package com.cars.a2.services;

import com.cars.a2.exceptions.EntityFailedToSaveException;
import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.exceptions.UnexpectedBehaviourException;
import com.cars.a2.models.Salesman;
import com.cars.a2.repositories.SalesmanRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesmenService {

    private static final Logger logger = LoggerFactory.getLogger(SalesmenService.class);

    private SalesmanRepository salesmanRepository;

    public SalesmenService(SalesmanRepository salesmanRepository) {
        this.salesmanRepository = salesmanRepository;
    }

    public ResponseEntity<Object> saveNewSalesmen(Salesman salesman) {
        try {
            salesmanRepository.save(salesman);
            return new ResponseEntity<>(salesman, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("Salesman couldn't be saved!");
        }
    }

    public ResponseEntity<Object> getSingleSalesman(String name) {
        List<Salesman> salesmen = salesmanRepository.findByNameContaining(name).orElseThrow(() -> new EntityNotFoundException("Salesmen are not found by name!"));
        return new ResponseEntity<>(salesmen, HttpStatus.OK);
    }

    public ResponseEntity<Object> getAllSalesman() {
        try {
            List<Salesman> salesmen = salesmanRepository.findAll();
            return new ResponseEntity<>(salesmen, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("Salesman couldn't be updated!");
        }
    }

    public ResponseEntity<Object> updateSalesman(Salesman salesman) {
        try {
            salesmanRepository.save(salesman);
            return new ResponseEntity<>(salesman, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new UnexpectedBehaviourException("Something went wrong while fetching all salesmen!");
        }
    }

    public ResponseEntity<Object> deleteSalesman(Long id) {
        try {
            salesmanRepository.deleteById(id);
            return new ResponseEntity<>("Salesman is deleted!", HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityNotFoundException("Salesman couldn't be deleted!");
        }
    }
}
