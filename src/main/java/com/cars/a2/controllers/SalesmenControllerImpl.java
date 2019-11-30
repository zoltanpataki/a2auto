package com.cars.a2.controllers;

import com.cars.a2.controllers.apis.SalesmenController;
import com.cars.a2.models.Salesman;
import com.cars.a2.services.SalesmenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SalesmenControllerImpl implements SalesmenController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SalesmenControllerImpl.class);

    private SalesmenService salesmenService;

    public SalesmenControllerImpl(SalesmenService salesmenService) {
        this.salesmenService = salesmenService;
    }

    @Override
    public ResponseEntity<Object> saveSalesman(Salesman salesman) {
        return salesmenService.saveNewSalesmen(salesman);
    }

    @Override
    public ResponseEntity<Object> getSalesman(String name) {
        return salesmenService.getSingleSalesman(name);
    }

    @Override
    public ResponseEntity<Object> getAllSalesmen() {
        return salesmenService.getAllSalesman();
    }

    @Override
    public ResponseEntity<Object> updateSalesman(Salesman salesman) {
        return salesmenService.updateSalesman(salesman);
    }

    @Override
    public ResponseEntity<Object> deleteSalesman(Long id) {
        return salesmenService.deleteSalesman(id);
    }
}
