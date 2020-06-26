package com.cars.a2.controllers;

import com.cars.a2.controllers.apis.InheritanceTaxController;
import com.cars.a2.models.InheritanceTax;
import com.cars.a2.services.InheritanceTaxService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class InheritanceTaxControllerImpl implements InheritanceTaxController {

    private static final Logger logger = LoggerFactory.getLogger(InheritanceTaxControllerImpl.class);

    private InheritanceTaxService inheritanceTaxService;

    public InheritanceTaxControllerImpl(InheritanceTaxService inheritanceTaxService) {
        this.inheritanceTaxService = inheritanceTaxService;
    }


    @Override
    public ResponseEntity<Object> getChargeForInheritanceTax(String kw, String age) {
        return inheritanceTaxService.getChargeForInheritanceTax(kw, age);
    }

    @Override
    public ResponseEntity<Object> getAllInheritanceTaxInfo() {
        return inheritanceTaxService.getAllInheritanceTaxInfo();
    }

    @Override
    public ResponseEntity<Object> updateInheritanceTax(List<InheritanceTax> inheritanceTaxes) {
        return inheritanceTaxService.updateInheritanceTaxInfo(inheritanceTaxes);
    }
}
